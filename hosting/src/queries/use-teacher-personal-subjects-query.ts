import { Teacher, teacherSchema } from "@/models/teacher-schema";
import { role } from "@/types/user";
import { queryOptions } from "@tanstack/react-query";
import { DocumentReference, getDoc } from "firebase/firestore";

export const getTeacherPersonalSubjectsFirestoreQuery = (roleRef: DocumentReference) => roleRef.withConverter({
    toFirestore: (data: Teacher) => data,
    fromFirestore: (snapshot, options) => teacherSchema.parse({ ...snapshot.data(options), id: snapshot.id }),
})

export const getTeacherPersonalSubjectsQueryOptions = (role: role | undefined, roleRef: DocumentReference | undefined) => queryOptions({
    queryKey: ['getTeacherPersonalSubjects', role, roleRef],
    queryFn: () => getDoc(getTeacherPersonalSubjectsFirestoreQuery(roleRef!)),
    select: (snapshot) => {
        if (!snapshot.exists()) throw new Error('Document teacher does not exist')

        return snapshot.data()
    },
    enabled: role && roleRef && role === 'teacher',
})
