import { RegisterRequests, registerSchema } from "@/models/register-schema"; 
import { firestore } from "@/services/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export function useRegisterSchemaQuery() {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const studentsRef = collection(firestore, 'teachers').withConverter({
        toFirestore: (doc: RegisterRequests) => doc,
        fromFirestore: (snapshot) => {
          try {
            return registerSchema.parse({ ...snapshot.data(), id: snapshot.id });
          } catch (e) {
            console.error('Erro na conversão dos dados:', e);
            throw e;
          }
        },
      });

      const docSnap = await getDocs(studentsRef);
      return docSnap.docs.map((doc) => doc.data());
    },
  });
}
