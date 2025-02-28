import { firestore } from "../services/firebase";

export const passwordGenerator = () => firestore.collection("password-dummy-generation").doc().id