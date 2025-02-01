import { Student, studentSchema } from "@/models/student-schema";
import { role } from "@/types/user";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { DocumentReference, getDoc } from "firebase/firestore";

export const studentPersonalClassesQueryOptions = (role: role | undefined, roleRef: DocumentReference | undefined) => queryOptions({
    queryKey: ['getStudentPersonalClasses', role, roleRef],
    queryFn: async () => {
        if (!roleRef) throw new Error('Role is not defined')

        const docRef = roleRef.withConverter({
            toFirestore: (data: Student) => data,
            fromFirestore: (snapshot, options) => studentSchema.parse({ ...snapshot.data(options), id: snapshot.id }),
        })

        const documentSnapshot = await getDoc(docRef)

        if (!documentSnapshot.exists()) throw new Error('Document student does not exist')

        return documentSnapshot.data()
    },
    enabled: !!roleRef && role === 'student',
})

export function useStudentPersonalClasses(role: role | undefined, roleRef: DocumentReference | undefined) {
    return useQuery(studentPersonalClassesQueryOptions(role, roleRef))
}