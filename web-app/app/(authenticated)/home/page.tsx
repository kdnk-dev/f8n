import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/supabaseClient-server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignOutButton from "@/app/(authenticated)/home/signout-button";
import { getToken } from "@kdnk.dev/f8n-utils";
import { AuthToken } from "@/utils/supabase/authorization";

export default async function Page() {
  const client = createClient();
  const user = await client.auth.getUser();
  const token = getToken<AuthToken>(await client.auth.getSession());

  return (
    <div className="flex flex-col h-screen justify-center">
      <Card className="mx-auto p-6 w-3/4 max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-semibold text-2xl">
            kdnk: f8n
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user.data.user?.id ? (
            <div>
              <p>You are not logged in.</p>
              <p>This page should not be accessible.</p>
              <p>Check middleware auth config.</p>
            </div>
          ) : (
            <div>
              <ul className="space-y-4">
                <li>
                  You are logged in as:
                  <br />
                  {user.data.user.email}
                </li>
                <li>
                  Role:
                  <br />
                  {token.app_metadata?.role}
                </li>
                <li>
                  Permissions:
                  <br />
                  {JSON.stringify(token.app_metadata?.permissions)}
                </li>
                <li>
                  User ID:
                  <br />
                  {user.data.user.id}
                </li>
                <li>
                  User Confirmed at:
                  <br />
                  {user.data.user.confirmed_at}
                </li>
                <li>
                  Email Confirmed at:
                  <br />
                  {user.data.user.email_confirmed_at}
                </li>
              </ul>
              <div className="flex flex-row flex-wrap gap-8 pt-8">
                <Link href="/set-password">
                  <Button className="w-36">Change Password</Button>
                </Link>
                <SignOutButton />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
