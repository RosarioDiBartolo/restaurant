// app/auth/session/route.ts
import { adminAuth } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Safely parse JSON
    const body = await req.json().catch(() => null);
    if (!body || !body.token) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    const { token } = body;

    // Verify Firebase token
    const decoded = await adminAuth.verifyIdToken(token);

    // Create response with cookie
    const res = NextResponse.json({ uid: decoded.uid, email: decoded.email });
    res.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error("Error in /auth/session:", error);
    return NextResponse.json(
      { error:  error instanceof Error? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
