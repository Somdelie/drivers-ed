
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      Hello World
      <Button>Login</Button>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
