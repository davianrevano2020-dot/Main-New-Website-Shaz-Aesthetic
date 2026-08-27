import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect all routes starting with /back-office
  if (pathname.startsWith('/back-office')) {
    const session = request.cookies.get('shaz_admin_session');
    if (!session || session.value !== 'authenticated') {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  
  // Prevent logged-in users from seeing the login page again
  if (pathname === '/login') {
    const session = request.cookies.get('shaz_admin_session');
    if (session && session.value === 'authenticated') {
      const url = request.nextUrl.clone();
      url.pathname = '/back-office';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/back-office/:path*', '/login'],
};
