import { Database } from "@/utils/supabase/database";

export type AuthToken = {
  app_metadata?: {
    role: Database["public"]["Enums"]["role"];
    permissions: Database["public"]["Enums"]["permission"][];
  };
};

export const requireLogin =
  () =>
  (token: AuthToken | null): boolean =>
    !!token?.app_metadata?.role;

export const requireRole =
  (role: Database["public"]["Enums"]["role"]) =>
  (token: AuthToken | null): boolean =>
    token?.app_metadata?.role === role;

export const requirePermission =
  (permission: Database["public"]["Enums"]["permission"]) =>
  (token: AuthToken | null): boolean =>
    token?.app_metadata?.permissions?.includes(permission) ?? false;
