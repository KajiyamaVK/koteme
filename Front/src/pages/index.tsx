import Link from "next/link";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="h-screen w-full flex">
      <Button className="m-auto ">
        <Link href="/login" className="text-white text-3xl">
          Login
        </Link>
      </Button>
    </div>
  );
}
