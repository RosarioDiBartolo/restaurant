 
import * as FirebaseAdmin from "firebase-admin";

// Init firebase-admin once
if (!FirebaseAdmin.apps.length) {
  FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)
    ),
  });
}
export const admin = FirebaseAdmin
export const adminAuth = admin.auth();
export const db = admin.firestore();