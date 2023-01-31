import { UserAuthContextProvider } from "@/hooks/useAuthContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <Component {...pageProps} />
    </UserAuthContextProvider>
  );
}
