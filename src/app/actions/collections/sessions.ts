"use server"

import admin from "firebase-admin"
import { ClientTableSession, OrderItem, TableSession } from "@/lib/types"
import collection from "@/app/actions/collections"

type TableSessionWrite = Omit<TableSession, "id" | "createdAt"> & {
  id: string
  createdAt: admin.firestore.FieldValue
}

type TableSessionUpdate = Omit<TableSessionWrite, "orders"> & {
  orders: admin.firestore.FieldValue | OrderItem[]
}

// Collection instance
const sessionsApi = collection<TableSession, TableSessionWrite, TableSessionUpdate>(
  "sessions",
  (coll) => coll.orderBy("createdAt")
)

/** Add a new session */
export async function addSession(session: TableSessionWrite) {
  return sessionsApi.add(session)
}

/** Update a session */
export async function updateSession(
  sessionId: string,
  data: Partial<TableSessionUpdate>
) {
  return sessionsApi.update(sessionId, data)
}

export async function editSessionOrders(
  sessionId: string,
  newOrders: OrderItem[]
) {

  const session = sessionsApi.getById(sessionId)
  if (!session) return

  return sessionsApi.update(sessionId, {...session, orders: newOrders  }  )
}
/** Delete a session */
export async function deleteSession(sessionId: string) {
  return sessionsApi.delete(sessionId)
}
export async function toClient(session: TableSession): Promise< ClientTableSession >{
  return ({...session,createdAt:  session.createdAt.toDate() ,  })       
  
}

/** Get a session by ID */
export async function getSessionById(sessionId: string) {
  return sessionsApi.getById(sessionId)
}

/** Get all sessions */
export async function getAllSessions() {
  return sessionsApi.getAll()
}
 
 export async function deleteOrder(
  sessionId: string,
  order: OrderItem
  
) {
 
   return sessionsApi.update(sessionId, {
        orders: admin.firestore.FieldValue.arrayRemove( order ),
   } )
}
/** Add a new order to a session */
export async function addOrder(
  sessionId: string,
  newOrderProps: Omit<OrderItem, "status" | "createdAt">
) {
  const newOrder = {
    ...newOrderProps,
    status: "in preparazione",
   }

  return sessionsApi.update(sessionId, {
    orders: admin.firestore.FieldValue.arrayUnion(newOrder),
  })
}
