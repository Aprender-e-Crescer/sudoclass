import { Subject, subjectsSchema } from '@/models/subjects-schema';
import { firestore } from '@/services/firebase';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';

export function useListSubjectsQuery(schoolMatricesId: string) {
  return useQuery<Subject[]>({
    queryKey: ['getSubjects', schoolMatricesId],
    queryFn: async () => {
      const subjectRefs = collection(firestore, 'schoolMatrices', schoolMatricesId, 'subjects').withConverter({
        toFirestore: (subject: Subject) => subject,
        fromFirestore: (snapshot: QueryDocumentSnapshot) => {
          return subjectsSchema.parse(snapshot.data());
        },
      });

      const snapshot = await getDocs(subjectRefs);
      return snapshot.docs.map((doc) => doc.data());
    },
  });
}
