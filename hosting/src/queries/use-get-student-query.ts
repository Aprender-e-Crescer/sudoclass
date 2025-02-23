import { Student, studentSchema } from "@/models/student-schema";
import { role } from "@/types/user";
import { queryOptions } from "@tanstack/react-query";
import { DocumentReference, getDoc } from "firebase/firestore";

export const getStudentFirestoreQuery = (roleRef: DocumentReference) => roleRef.withConverter({
    toFirestore: (data: Student) => data,
    fromFirestore: (snapshot, options) => studentSchema.parse({ ...snapshot.data(options), id: snapshot.id, ref: snapshot.ref }),
})

export const getStudentQueryOptions = (role: role, roleRef: DocumentReference) => queryOptions({
    queryKey: ['getStudent', role, roleRef],
    queryFn: () => getDoc(getStudentFirestoreQuery(roleRef)),
    select: (snapshot) => {
        if (!snapshot.exists()) throw new Error('Document student does not exist')

        return snapshot.data()
    },
    enabled: role === 'student',
})