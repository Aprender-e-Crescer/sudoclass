import { Student, StudentSchema } from "@/models/students-schema";
import { firestore } from "@/services/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export function useStudentsListQuery() {
    return useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const studentsRef = collection(firestore, 'students').withConverter({
                toFirestore: (doc: Student) => doc,
                fromFirestore: (snapshot) => StudentSchema.parse({...snapshot.data(), id: snapshot.id}),
            })

            const docSnap = await getDocs(studentsRef)

            return docSnap.docs.map((doc) => doc.data())
        }
    })
}