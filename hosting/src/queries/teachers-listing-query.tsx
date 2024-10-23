import { RegisterRequests, registerSchema } from "@/models/teachers-schema"; 
import { firestore } from "@/services/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export function TeachersSchemaQuery() {
    return useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const teachersRef = collection(firestore, 'teachers').withConverter({
                toFirestore: (doc: RegisterRequests) => doc,
                fromFirestore: (snapshot) => {
                    const data = snapshot.data();
                    return registerSchema.parse({ ...data, id: snapshot.id });
                },
            });
            const docSnap = await getDocs(teachersRef);
            return docSnap.docs.map(doc => doc.data());
        },
       
    });
}
