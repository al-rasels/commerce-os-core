import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  
  // In a real implementation, we would look up the tenant by hostname
  // using an Edge Config or Edge Database call, then rewrite to a path
  // like `/_tenant/tenantId/path`.
  // For Phase 1 MVP, we assume single API connection context or pass
  // hostname in headers. Next.js handles rewrites in next.config.ts for API.
  
  // Attach tenant domain header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-domain', hostname || '');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
