import { firestore } from '@/services/firebase';
import { listFormsSchema } from '@/models/list-forms-schema';
import { useQuery } from '@tanstack/react-query';
import { collection, getDoc, doc, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const LIST_FORMS_QUERY_KEY = ['getForms'];

export function ListFormsQuery() {
  return useQuery({
    queryKey: LIST_FORMS_QUERY_KEY,
    queryFn: async () => {
      const formsRef = collection(firestore, 'forms');
      const formsSnapshot = await getDocs(formsRef);

      const forms = await Promise.all(
        formsSnapshot.docs.map(async (docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
          const data = docSnapshot.data();

          let createdBy = 'Autor não definido';
          if (data.createdBy) {
            const adminRef = doc(firestore, 'admins', data.createdBy.id);
            const adminSnapshot = await getDoc(adminRef);
            const adminData = adminSnapshot.data();

            createdBy = adminData && typeof adminData.nome === 'string' 
              ? adminData.nome 
              : 'Autor não encontrado';
          }

          return listFormsSchema.parse({
            name: typeof data.name === 'string' ? data.name : 'Nome não definido',
            createdBy: createdBy,
            createdDate: data.createdDate ? data.createdDate.toDate() : "Data não encontrada",
          });
        })
      );

      return forms;
    },
  });
}
