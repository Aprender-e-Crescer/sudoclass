import { firestore } from '@/services/firebase';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { listFormSchema } from '@/models/list-forms-schema';

export const LIST_FORMS_QUERY_KEY = ['getForms'];

export function listFormsQuery() {
  return useQuery({
    queryKey: LIST_FORMS_QUERY_KEY,
    queryFn: async () => {
      const formsRef = collection(firestore, 'forms').withConverter(listFormSchema);
      const snapshot = await getDocs(formsRef);
      return snapshot.docs.map((doc) => doc.data());
    },
  });
}
