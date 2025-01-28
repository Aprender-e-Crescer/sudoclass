import { role } from "@/types/user";
import { DocumentReference } from "firebase/firestore";

export const getRoleFromRef = (roleRef: DocumentReference | undefined) => roleRef?.path.split('/')[0].slice(0, -1) as role | undefined
