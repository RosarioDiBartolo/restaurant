// app/auth/session/route.ts
import { adminAuth } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();
  const decoded = await adminAuth.verifyIdToken(token);

  const res = NextResponse.json({ uid: decoded.uid, email: decoded.email });
  res.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
