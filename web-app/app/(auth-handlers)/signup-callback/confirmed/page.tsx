import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col h-screen justify-center items-center gap-8">
      <div className="text-4xl font-bold font-mono">
        Thanks for confirming your email address!
      </div>
      <div className="flex flex-row gap-12">
        <Link href="/home">
          <Button className="w-20">Continue</Button>
        </Link>
      </div>
    </main>
  );
}
