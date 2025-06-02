import { createClient } from "@/utils/supabase/supabaseClient-server";
import { NextResponse } from "next/server";
import { Database } from "@/utils/supabase/database";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  const client = await createClient<Database>();

  if (code) {
    await client.auth.exchangeCodeForSession(code);
  }

  const user = await client.auth.getUser();

  if (user.data?.user?.id) {
    return NextResponse.redirect(`${origin}/home`);
  } else {
    return NextResponse.redirect(`${origin}/magic-link-callback/error`);
  }
}
