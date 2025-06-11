import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// i18n middleware
const intlMiddleware = createMiddleware(routing);

// Match localized protected routes
const isProtectedRoute = createRouteMatcher([
  '/en/create-post',
  '/fr/create-post',
  '/es/create-post',
]);

export default clerkMiddleware(async (auth, req) => {
  const authResult = await auth(); // ✅ await and store the result
  const { userId } = authResult;

  if (isProtectedRoute(req)) {
    if (!userId) {
      // ✅ use authResult.redirectToSignIn()
      return authResult.redirectToSignIn({ returnBackUrl: req.url });
    }
  }

  // Run intl middleware too
  const response = intlMiddleware(req);
  if (response) return response;

  return;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
