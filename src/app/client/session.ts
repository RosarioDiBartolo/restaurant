import { db } from "@/lib/firebase-client";
import { OrderItem } from "@/lib/types";
import { collection,   updateDoc, doc, arrayUnion } from "firebase/firestore";

/** Add a new order to a session */
export async function addOrder(
  sessionId: string,
  newOrderProps: Omit<OrderItem, "status" | "createdAt">
) {
  const newOrder = {
    ...newOrderProps,
    status: "in attesa",
   }

   return  await updateDoc( doc(collection(db, "sessions"), sessionId),  { orders: arrayUnion(newOrder)}  );
 
}
