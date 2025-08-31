"use server"
import { ClientSessionMetadata  } from "@/lib/types"
import { closeTable } from "./collections/tables"
import {   toClient, editSessionOrders } from "./collections/sessions"
import { FineSatus, dispatchSchema } from "./schemas";
 
 
 interface ErrorSatus  {
  type: "error";
  message: string;
}


type Status = ErrorSatus | FineSatus

export const dispatchAction = async (
  prevState: {meta: ClientSessionMetadata | null, status: Status} ,
  formData: FormData
): Promise<{meta: ClientSessionMetadata | null, status: Status} > => {
  try {
    // Convert FormData to plain object for Zod validation
    const rawData = Object.fromEntries(formData.entries().map(([k,v])=> [k, JSON.parse(v.toString() )] ))
 
     const data = await dispatchSchema.parseAsync(rawData)
 
    if (!prevState.meta) {
       return { status: {
        type: "error",
        message: "Trying to call an action on a null session... This shouldn't be possible since null tables should be hidden from the UI..."
      }, meta: null }
    }
    
    switch (data.type) {

      case "editOrders": {
 
        const updatedSession = await editSessionOrders(data.sessionId, data.orders  )
        if (!updatedSession) { 
          throw new Error("Error orccured while  editing session orders")
        }
         const clientUpdate = await toClient(
          updatedSession
         )

        return { ...prevState, meta: {...prevState.meta , orders: clientUpdate.orders} }
      }
      case "closeTable": {
        console.log("Closing table:", data.id)
        await closeTable(Number(data.id))
        return {...prevState, meta: null}
      }
      }
  } catch (error) {
    console.error("Dispatch action error:", error)

    // Return error state or previous state
    return {...prevState, status: {
      type: "error", message: error instanceof Error? error.message: "Unknown error"    }}
  }
}