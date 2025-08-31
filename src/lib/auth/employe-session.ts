// lib/session.ts
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

export async function getSession() {
  const Cookies = await cookies()
  const token = Cookies.get("session")?.value;
  if (!token) return null;
  try {
    return await adminAuth.verifyIdToken(token);
  } catch {
    return null;
  }
}
