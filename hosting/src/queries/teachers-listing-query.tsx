import { registerSchema } from "@/models/register-schema"; } 
import { firestore } from "@/services/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export function registerSchemaQuery(){
    return useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const studentsRef = collection(firestore, 'teachers').withConverter({
                toFirestore: (doc: Teachers) => doc,
                fromFirestore: (snapshot) => registerSchema.parse({...snapshot.data(), id: snapshot.id}),
            })

            const docSnap = await getDocs(studentsRef)

            return docSnap.docs.map((doc) => doc.data())
        }
    })
}

}
