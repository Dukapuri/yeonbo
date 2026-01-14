import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * 아래 경로들을 제외한 모든 요청에 미들웨어 적용:
     * 1. /api (API 라우트)
     * 2. /_next (Next.js 내부 리소스)
     * 3. /_static (공용 정적 파일)
     * 4. favicon.ico, sitemap.xml 등
     */
    '/((?!api|_next|_static|_fonts|favicon.ico|sitemap.xml).*)',
  ],
};

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  const rootDomain = process.env.ROOT_DOMAIN || 'yeonbolocal.me';
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Local development environment
  if (process.env.NODE_ENV === 'development') {
    // Try to extract subdomain from the full URL
    const escapedDomain = rootDomainFormatted.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const fullUrlMatch = url.match(new RegExp(`http://([^.]+)\\.${escapedDomain}`));
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes(`.${rootDomainFormatted}`)) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment
  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
    }
  }

  // On the root domain, allow normal access
  return NextResponse.next();
}
