import { OrderItemSchema } from "@/lib/types";
import { z } from "zod"

export const editeOrderSchema = z.object({
  type: z.literal("editOrders"),
  sessionId: z.string(),
  orders: z.array( OrderItemSchema)
})

export const closeTableSchema = z.object({
  type: z.literal("closeTable"),
  id: z.string(),
})

export const dispatchSchema = z.union([editeOrderSchema, closeTableSchema])
export interface FineSatus  {
  type: "fine";
}