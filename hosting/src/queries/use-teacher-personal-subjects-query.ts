import { Teacher, teacherSchema } from "@/models/teacher-schema";
import { role } from "@/types/user";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { DocumentReference, getDoc } from "firebase/firestore";

export const teacherPersonalSubjectsQueryOptions = (role: role | undefined, roleRef: DocumentReference | undefined) => queryOptions({
    queryKey: ['getTeacherPersonalSubjects', role, roleRef],
    queryFn: async () => {
        if (!roleRef) throw new Error('Role is not defined')

        const docRef = roleRef.withConverter({
            toFirestore: (data: Teacher) => data,
            fromFirestore: (snapshot, options) => {
                const data = snapshot.data(options)
    
                return teacherSchema.parse({ ...data, id: snapshot.id })
            },
        })

        const documentSnapshot = await getDoc(docRef)
        return documentSnapshot.data()
    },
    enabled: !!roleRef && role === 'teacher',
})
    

export function useTeacherPersonalSubjects(role: role | undefined, roleRef: DocumentReference | undefined) {
    return useQuery(teacherPersonalSubjectsQueryOptions(role, roleRef))
}