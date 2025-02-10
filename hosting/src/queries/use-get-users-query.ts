import { User, userSchema } from "@/models/user-schema";
import { firestore } from "@/services/firebase";
import { queryOptions } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export const getUsersFirestoreQuery = collection(firestore, "users").withConverter({
    toFirestore: (data: User) => data,
    fromFirestore: (snapshot, options) => userSchema.parse(({ ...snapshot.data(options), id: snapshot.id })), 
})

export const getUsersQueryOptions = queryOptions({
    queryKey: ["getUsers"],
    queryFn: () => getDocs(getUsersFirestoreQuery),
    select: (snapshot) => snapshot.docs.map(doc => doc.data()),
}) 