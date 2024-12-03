import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="flex flex-col h-screen justify-center items-center gap-8">
      <div className="text-2xl font-bold font-mono text-center space-y-8">
        <p>The link you clicked on has expired or is invalid.</p>
        <p>
          If you are not able to login, please contact customer support for next
          steps.
        </p>
      </div>
      <div className="flex flex-row gap-12">
        <Link href="/login-with-magic-link">
          <Button>Request a new link</Button>
        </Link>
      </div>
    </main>
  );
}
