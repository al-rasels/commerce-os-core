export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function getToken(): string | null {
  return localStorage.getItem('admin_token');
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
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let res = await fetch(path, { ...options, headers });

  if (res.status === 401 && !path.includes('/auth/login') && !path.includes('/auth/refresh')) {
    if (isRefreshing) {
      try {
        const newToken = await new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        headers['Authorization'] = `Bearer ${newToken}`;
        res = await fetch(path, { ...options, headers });
      } catch (err) {
        throw new ApiError(401, 'Unauthorized');
      }
    } else {
      isRefreshing = true;
      try {
        // Try refreshing
        const refreshRes = await fetch('/api/v1/auth/refresh', { method: 'POST' });
        if (!refreshRes.ok) throw new Error('Refresh failed');
        
        const data = await refreshRes.json();
        localStorage.setItem('admin_token', data.access_token);
        // Sync to AuthContext handled via storage event natively
        
        processQueue(null, data.access_token);
        
        headers['Authorization'] = `Bearer ${data.access_token}`;
        res = await fetch(path, { ...options, headers });
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
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message || `Request failed (${res.status})`);
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
