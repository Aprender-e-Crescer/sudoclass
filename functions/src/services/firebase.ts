import * as admin from "firebase-admin";

export const app = admin.initializeApp();
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage().bucket();
