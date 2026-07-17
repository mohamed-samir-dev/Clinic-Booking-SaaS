import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PROTECTED_ROUTES: Record<string, string[]> = {
  '/pages/owner': ['owner'],
  '/pages/manager': ['manager'],
  '/pages/doctor': ['doctor'],
  '/pages/patient': ['patient'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const matchedPrefix = Object.keys(PROTECTED_ROUTES).find((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!matchedPrefix) return NextResponse.next();

  const token = request.cookies.get('token')?.value;

  if (!token) {
    const loginUrl = new URL('/pages/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const allowedRoles = PROTECTED_ROUTES[matchedPrefix];

    if (!allowedRoles.includes(payload.role as string)) {
      const roleRedirects: Record<string, string> = {
        owner: '/pages/owner',
        manager: '/pages/manager',
        doctor: '/pages/doctor',
        patient: '/',
      };
      return NextResponse.redirect(
        new URL(roleRedirects[payload.role as string] || '/', request.url)
      );
    }
  } catch {
    const loginUrl = new URL('/pages/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/pages/owner/:path*',
    '/pages/manager/:path*',
    '/pages/doctor/:path*',
    '/pages/patient/:path*',
  ],
};
