import { User, userSchema } from "@/models/user-schema";
import { firestore } from "@/services/firebase";
import { queryOptions } from "@tanstack/react-query";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";

export const getUsersFirestoreQuery = (uid: string) => query(
    collection(firestore, "users"),
    where(documentId(), "!=", uid),
).withConverter({
    toFirestore: (data: User) => data,
    fromFirestore: (snapshot, options) => userSchema.parse(({ ...snapshot.data(options), id: snapshot.id })), 
})

export const getUsersQueryOptions = (uid: string) => queryOptions({
    queryKey: ["getUsers", uid],
    queryFn: () => getDocs(getUsersFirestoreQuery(uid)),
    select: (snapshot) => snapshot.docs.map(doc => doc.data()),
}) 