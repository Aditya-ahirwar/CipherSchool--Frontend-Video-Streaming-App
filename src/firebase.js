import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "video-stream-auth.firebaseapp.com",
  projectId: "video-stream-auth",
  storageBucket: "video-stream-auth.appspot.com",
  messagingSenderId: "681160402110",
  appId: "1:681160402110:web:8fbb703b4479db76e16aef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
