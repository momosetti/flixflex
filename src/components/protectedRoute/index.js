import { useUserAuth } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user } = useUserAuth();
  console.log("Check user  ", user);
  useLayoutEffect(() => {
    if (!user) router.push("/login");
  }, []);
  return children;
}
