import { firestore } from "@/services/firebase";
import { doc, collection } from "firebase/firestore";

export const genFirestoreId = () => doc(collection(firestore, 'genId')).id