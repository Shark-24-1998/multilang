import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// i18n middleware
const intlMiddleware = createMiddleware(routing);

// Match protected localized routes
const isProtectedRoute = createRouteMatcher([
  '/en/create-post',
  '/fr/create-post',
  '/es/create-post',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isProtectedRoute(req)) {
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('returnBackUrl', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  return;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};