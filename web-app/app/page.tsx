import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col h-screen justify-center items-center gap-8">
      <div className="text-4xl font-bold font-mono">kdnk: f8n</div>
      <div className="flex flex-col gap-6">
        <Link href="/signup">
          <Button className="w-40">Sign Up</Button>
        </Link>
        <Link href="/login">
          <Button className="w-40">Login</Button>
        </Link>
        <Link href="/login-magic-link">
          <Button className="w-40">Login with Magic Link</Button>
        </Link>
        <Link href="/forgot-password">
          <Button className="w-40">Forgot Password</Button>
        </Link>
      </div>
    </main>
  );
}
