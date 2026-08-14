const API_BASE = import.meta.env.VITE_API_URL || '';

export class ApiError extends Error {
  status: number;
  errorCode?: string;
  traceId?: string;
  validationErrors?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    errorCode?: string,
    traceId?: string,
    validationErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errorCode = errorCode;
    this.traceId = traceId;
    this.validationErrors = validationErrors;
  }
}

function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getRefreshToken(): string | null {
  return localStorage.getItem('admin_refresh_token');
}

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const method = (options.method || 'GET').toUpperCase();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!SAFE_METHODS.has(method)) {
    const csrf = getCsrfToken();
    if (csrf) headers['x-csrf-token'] = csrf;
  }

  const fetchOptions: RequestInit = { ...options, headers, credentials: 'include' };
  let res = await fetch(`${API_BASE}${path}`, fetchOptions);

  if (res.status === 401 && !path.includes('/auth/login') && !path.includes('/auth/refresh')) {
    if (isRefreshing) {
      try {
        const newToken = await new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        headers['Authorization'] = `Bearer ${newToken}`;
        res = await fetch(`${API_BASE}${path}`, { ...fetchOptions, headers });
      } catch {
        throw new ApiError(401, 'Unauthorized');
      }
    } else {
      isRefreshing = true;
      try {
        // Try refreshing
        const refreshToken = getRefreshToken();
        const refreshHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
        const refreshCsrf = getCsrfToken();
        if (refreshCsrf) refreshHeaders['x-csrf-token'] = refreshCsrf;
        const refreshRes = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: refreshHeaders,
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
        if (!refreshRes.ok) throw new Error('Refresh failed');
        
        const data = await refreshRes.json();
        localStorage.setItem('admin_token', data.access_token);
        if (data.refresh_token) localStorage.setItem('admin_refresh_token', data.refresh_token);
        // Sync to AuthContext handled via storage event natively
        
        processQueue(null, data.access_token);
        
        headers['Authorization'] = `Bearer ${data.access_token}`;
        res = await fetch(`${API_BASE}${path}`, { ...fetchOptions, headers });
      } catch (err) {
        processQueue(err as Error, null);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/login';
        throw new ApiError(401, 'Unauthorized');
      } finally {
        isRefreshing = false;
      }
    }
  }

  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/login';
    throw new ApiError(401, 'Unauthorized');
  }

  if (!res.ok) {
    let body: any = {};
    try {
      body = await res.json();
    } catch {
      // Not JSON
    }

    // Dispatch custom event for global toast handling
    const error = new ApiError(
      res.status,
      body.detail || body.message || `Request failed (${res.status})`,
      body.errorCode,
      body.traceId,
      body.validationErrors
    );

    window.dispatchEvent(new CustomEvent('global-api-error', { detail: error }));
    throw error;
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
