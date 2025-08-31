 import { useDoc as useGenericDoc} from "./firestore"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import { Table, TableSession } from "@/lib/types";
 

export function createCollection <T> (collectionName: string) {
    
    return {
        useDoc: (id: string)=>  useGenericDoc<T>(collectionName, id),
        addDoc:  async (data: T)=>{
             const ref = collection(db, collectionName);
                return await addDoc(ref, data as unknown);
        },
        updateDoc: async (id: string, data: Partial<T>)=> {
            const ref = doc(db, collectionName, id);
            return await updateDoc(ref, data  );
          },
        
        deleteDoc: async (id: string)=>{
             const ref = doc(db, collectionName, id);
            return await deleteDoc(ref);
        }
    }

}


export const sessionsCollection = createCollection<TableSession>("sessions")
export const tablesCollection = createCollection<Table>("tables")