// app/components/AuthProvider.tsx
"use client";

import { PropsWithChildren, useEffect } from "react";
import { auth } from "@/lib/firebase-client";
import { onIdTokenChanged } from "firebase/auth";

export default function AuthProvider({children}: PropsWithChildren) {
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        await fetch("/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  
  return <>{children}</>; 
}
