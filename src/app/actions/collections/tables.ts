"use server"
// ---- TABLES ----

import { Table } from "@/lib/types"
import collection from "."
import { addSession } from "./sessions"
import { db } from "../../../lib/firebase-admin"
import { firestore } from "firebase-admin"

const tableApi = collection<Table>(
  "tables",
  (coll) => coll.where("open", "==", true)
)
export async function getOpenTable(id: number) {
  const table =  await tableApi.getById(id.toString())
  return table && table.open? table: await openTable(id)
}

export async function getTable(id: number) {
  const table =  await tableApi.getById(id.toString())
  return table
}

/** Close a table by ID */
export async function closeTable(id: number) {
  return tableApi.update(id.toString(), { open: false })
}

/** Get all open tables, sorted numerically by ID */
export async function getTables() {
  const tables = await tableApi.getAll()
  return tables
    .map((t) => ({ ...t, id: Number(t.id) }))
    .sort((t1, t2) => t1.id - t2.id)
}

/** Open a table and create a session */
export async function openTable(   id: number  ) {
  const session = await addSession({
    id: db.collection("sessions").doc().id, // auto-generated ID
    table: id,
    orders: [],
    createdAt: firestore.FieldValue.serverTimestamp(),
  })

  return tableApi.add({
    id: id.toString(),
    open: true,
    lastSessionId: session.id,
  })
}

