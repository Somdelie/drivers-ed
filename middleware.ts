import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//protect all routes except the sign-in, sign-up, and certificate/id routes
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*), /sign-up(.*)",
  "/certificate(.*)",
  "/id(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
