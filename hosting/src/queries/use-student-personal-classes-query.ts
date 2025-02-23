import { Student, studentSchema } from "@/models/student-schema";
import { role } from "@/types/user";
import { queryOptions } from "@tanstack/react-query";
import { DocumentReference, getDoc } from "firebase/firestore";

export const getStudentPersonalClassesFirestoreQuery = (roleRef: DocumentReference) => roleRef.withConverter({
    toFirestore: (data: Student) => data,
    fromFirestore: (snapshot, options) => studentSchema.parse({ ...snapshot.data(options), ref: snapshot.ref, id: snapshot.id }),
})

export const getStudentPersonalClassesQueryOptions = (role: role, roleRef: DocumentReference) => queryOptions({
    queryKey: ['getStudentPersonalClasses', role, roleRef],
    queryFn: () => getDoc(getStudentPersonalClassesFirestoreQuery(roleRef)),
    select: (snapshot) => {
        if (!snapshot.exists()) throw new Error('Document student does not exist')

        return snapshot.data()
    },
    enabled: role === 'student',
})
