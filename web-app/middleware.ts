import { type NextRequest } from "next/server";
import { updateSession } from "@kdnk.dev/f8n-utils/server";
import {
  authorizedPaths,
  redirectConfig,
  unauthorizedFallbackUrl,
} from "@/utils/supabase/authorized-paths";

export async function middleware(request: NextRequest) {
  return await updateSession(
    request,
    redirectConfig,
    authorizedPaths,
    unauthorizedFallbackUrl,
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
