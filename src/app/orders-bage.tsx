"use client";

import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase-client";
import { cn } from "@/lib/utils";
import { doc,  onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function OrdersBadge({ initalOrdersCount, className, sessionId }: { className? :string;  sessionId: string , initalOrdersCount: number}) {
  const [count, setCount] = useState<number>(initalOrdersCount);
   useEffect(() => {
    const ref = doc(db, "sessions", sessionId);
 
    // Subscribe to live updates
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setCount(data?.orders?.length ?? 0);
      }
    });

    return () => unsub();
  }, [sessionId]);

  if (count === 0) return null;

  return (
    <Badge className={cn("absolute   -top-1 -right-1 rounded-full text-xs", className)}>
      {count}
    </Badge>
  );
}
