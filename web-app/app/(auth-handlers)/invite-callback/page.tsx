"use client";

import { createClient } from "@/utils/supabase/supabaseClient-browser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "@/utils/supabase/database";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Fragment = {
  access_token: string | null;
  refresh_token: string | null;
  error: string | null;
  error_description: string | null;
};

export default function Page() {
  const router = useRouter();
  const supabase = createClient<Database>();

  const [fragment, setFragment] = useState<Fragment | null>(null);

  useEffect(() => {
    if (window !== undefined) {
      const fragment = new URLSearchParams(window.location.hash.slice(1));

      setFragment({
        access_token: fragment.get("access_token"),
        refresh_token: fragment.get("refresh_token"),
        error: fragment.get("error"),
        error_description: fragment.get("error_description"),
      });
    }
  }, []);

  useEffect(() => {
    if (fragment && fragment.access_token && fragment.refresh_token) {
      supabase.auth
        .setSession({
          access_token: fragment.access_token,
          refresh_token: fragment.refresh_token,
        })
        .then(() => router.push("/home"));
    }
  }, [fragment, supabase, router]);

  return (
    <main className="flex flex-col h-screen justify-center items-center gap-8">
      <div className="text-4xl font-bold font-mono">kdnk: f8n</div>
      <div className="flex flex-row gap-12">
        {(() => {
          if (fragment && fragment.error) {
            return (
              <div className="flex flex-col items-center ">
                <p className="text-xl p-4">{fragment.error_description}</p>
                <p className="text-lg p-4">
                  <Link href={"/forgot-password"}>
                    <Button>Request a new link</Button>
                  </Link>
                </p>
              </div>
            );
          } else {
            return <p className="text-lg">Please wait...</p>;
          }
        })()}
      </div>
    </main>
  );
}
