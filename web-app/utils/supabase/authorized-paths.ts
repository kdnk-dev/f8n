import { AuthToken, requireLogin } from "@/utils/supabase/authorization";

export const unauthorizedFallbackUrl = "/";
export const redirectConfig = [
  {
    redirectPredicate: (token: AuthToken | null, path: string) =>
      path === "/" && requireLogin()(token),
    redirectTo: "/home",
  },
  {
    redirectPredicate: (token: AuthToken | null, path: string) =>
      ["/home", "/set-password"].includes(path) && token === null,
    redirectTo: "/",
  },
];
export const authorizedPaths = [
  {
    paths: ["/", "/forgot-password", "/login", "/login-magic-link", "/signup"],
    pathPrefixes: [
      "/invite-callback",
      "/magic-link-callback",
      "/password-reset-callback",
      "/signup-callback",
    ],
    authPredicate: () => true,
  },
  {
    paths: ["/set-password", "/home"],
    authPredicate: requireLogin(),
  },
];
