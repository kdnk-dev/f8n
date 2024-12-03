"use client";

import LoginForm from "@/components/login-form";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main className="flex flex-col h-screen justify-center">
      <LoginForm onActionSucceeded={() => router.push("/home")} />
    </main>
  );
}
