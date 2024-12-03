import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="flex flex-col h-screen justify-center items-center gap-8">
      <div className="text-2xl font-bold font-mono text-center space-y-8">
        <p>The link you clicked on has expired or is invalid.</p>
      </div>
      <Link href="/forgot-password">
        <Button>Request a new link</Button>
      </Link>
    </main>
  );
}
