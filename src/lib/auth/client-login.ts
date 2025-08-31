"use client";
import { auth } from "@/lib/firebase-client";
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (email: string, password: string) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
   const token = await userCred.user.getIdToken();

  // Send token to server to set session cookie
  const res = await fetch("/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return await res.json();
};
