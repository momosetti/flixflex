import { useUserAuth } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user } = useUserAuth();
  useLayoutEffect(() => {
    if (!user && router.pathname !== "/login") router.push("/login");
    if (user && router.pathname === "/login") router.push("/");
  }, [user, router]);
  return children;
}
