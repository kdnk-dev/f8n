"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/actions-auth";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        const success = await signOut();
        router.push(success ? "/" : "/error");
      }}
      className="w-36"
    >
      Log Out
    </Button>
  );
}
