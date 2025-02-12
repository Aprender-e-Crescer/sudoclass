import { useMutation } from '@tanstack/react-query';
import { firestore } from '@/services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CreateActivityData {
  title: string;
  description: string;
  attachments: string[];
  deliveryDate: Date;
  idCourse: string;
  idClass: string;
  idSubject: string;
}

export function useCreateActivityMutation() {
  return useMutation({
    mutationFn: async (data: CreateActivityData) => {
      const activitiesRef = collection(
        firestore,
        'courses',
        data.idCourse,
        'classes',
        data.idClass,
        'subjects',
        data.idSubject,
        'activities',
      );

      const newActivity = {
        title: data.title,
        description: data.description,
        deliveryDate: data.deliveryDate,
        attachments: data.attachments,
        postingDate: serverTimestamp(),
        isAcceptingSubmits: true,
      };

      const docRef = await addDoc(activitiesRef, newActivity);

      return docRef.id;
    },
  });
}