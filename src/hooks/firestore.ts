"use client"
import { useEffect, useState } from "react";
import {   collection,   doc, DocumentData, onSnapshot, query, QueryConstraint, QueryDocumentSnapshot,   } from "firebase/firestore";
import { db } from "@/lib/firebase-client";

// Wrapper per ogni documento
function DocRef<T>(snap: QueryDocumentSnapshot<DocumentData>): {
  id: string;
  fetch: () => T & { id: string };
} {
  return {
    id: snap.id,
    fetch: () => ({ id: snap.id, ...snap.data() } as T & { id: string })
  };
}

// Hook per una intera collection
export function useCollection<T>(collectionName: string, constraints: QueryConstraint[] = []) {
  const [docs, setDocs] = useState<
    { id: string; fetch: () => T & { id: string } }[]
  >([]);

  useEffect(() => {
    const baseRef = collection(db, collectionName);
    const q = constraints.length > 0 ? query(baseRef, ...constraints) : baseRef;

    const unsub = onSnapshot(q, (snap) => {
      const refs = snap.docs.map((d) => DocRef<T>(d));
      setDocs(refs);
    });

    return () => unsub();
  }, [collectionName, JSON.stringify(constraints)]);

  return docs;
}

  
// Hook per un singolo documento
export function useDoc<T>(collectionName: string, id: string) {
  const [docData, setDocData] = useState<{status: "unknown" | "missing"   } | {doc: (T & { id: string }) , status: "exist" }>({ status: "unknown" });

  useEffect(() => {
    const ref = doc(db, collectionName, id);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const doc = { id: snap.id, ...snap.data() } as T & { id: string }
        setDocData( {doc, status: "exist"});
      } else {
        setDocData({ status: "missing" });
      }
    });

    return () => unsub();
  }, [collectionName, id]);

  return docData
}
