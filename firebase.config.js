import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPWJxw01C2dsMRVbUDPfnScj6RfsuphD8",
  authDomain: "flixflex-4dafc.firebaseapp.com",
  projectId: "flixflex-4dafc",
  appId: "1:339252473306:web:c5528ed30d89aa24c4a4e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
