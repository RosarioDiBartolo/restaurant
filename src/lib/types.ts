 
import { z } from "zod"
import admin from "firebase-admin"


export const StatusSchema = z.enum(["in preparazione", "in attesa", "consegnato"])
// OrderItem schema
export const OrderItemSchema = z.object({
  options: z.record(z.string(), z.string()),
  productName: z.string(),
  category: z.string(),
  quantity: z.number(),
  status: StatusSchema,
 })

 export type OrderStatus = z.infer<typeof StatusSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>

// OrderItem just reuses OrderItem (your ClientType utility isn’t defined here, 
// so you can wrap OrderItemSchema accordingly in your own logic)
 
// TableSession schema
export const TableSessionSchema = z.object({
  id: z.string(),
  orders: z.array(OrderItemSchema),
  table: z.number(),
  createdAt: z.instanceof(admin.firestore.Timestamp),
})

export type TableSession = z.infer<typeof TableSessionSchema>

// Table schema
export const TableSchema = z.object({
  id: z.number(),
  open: z.boolean(),
  lastSessionId: z.string(),
})

export type Table = z.infer<typeof TableSchema>


export type ClientType<T> = Omit<T, "createdAt"> & {
  createdAt: Date;
}
 export type ClientTableSession = Omit<ClientType<TableSession>, "orders"  > & {
  orders: OrderItem[]
 }

export type ClientSessionMetadata = ClientTableSession & {
  tableOpen: boolean
 }
