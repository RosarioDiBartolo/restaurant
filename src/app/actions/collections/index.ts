 
import { db } from "@/lib/firebase-admin" 

// Generic collection wrapper
export default function collection<
  T , // Read type
  W   = T, // Write type
  U = W
  >(
  name: string,
  getAllCollectionCallback?: (
    collection: FirebaseFirestore.CollectionReference
  ) => FirebaseFirestore.Query
) {
  const coll = db.collection(name)

  return {
    add: async (params: Omit<W, "id"> & {id: string} ) => {
      const docRef = coll.doc(params.id)
      await docRef.set(params, { merge: true })
      const snapshot = await docRef.get()
      return { id: snapshot.id, ...snapshot.data() } as T
    },

    update: async (id: string, data: Partial<U>) => {
      const docRef = coll.doc(id)
      await docRef.update(data)
      const snapshot = await docRef.get()
      return { id: snapshot.id, ...snapshot.data() } as T
    },

    delete: async (id: string) => {
      await coll.doc(id).delete()
      return id
    },

    getById: async (id: string) => {
      const snapshot = await coll.doc(id).get()
      if (!snapshot.exists) return null
      return { id: snapshot.id, ...snapshot.data() } as T
    },

    getAll: async () => {
      const query = getAllCollectionCallback
        ? getAllCollectionCallback(coll)
        : coll
      const snapshot = await query.get()
      return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as T)
      )
    },
  }
}

 