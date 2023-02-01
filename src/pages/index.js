import { useRouter } from "next/router";
import { useEffect } from "react";
import NavBar from "@/components/navBar";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/movies");
  });
  return (
    <>
      <NavBar />
    </>
  );
}
