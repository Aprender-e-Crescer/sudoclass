import { useMutation } from '@tanstack/react-query';
import { firestore } from '@/services/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

interface DeleteActivityData {
  idCourse: string;
  idClass: string;
  idSubject: string;
  idActivity: string;
}

export function useDeleteActivityMutation() {
  return useMutation({
    mutationFn: async (data: DeleteActivityData) => {
      const activityRef = doc(
        firestore,
        'courses',
        data.idCourse,
        'classes',
        data.idClass,
        'subjects',
        data.idSubject,
        'activities',
        data.idActivity
      );

      await deleteDoc(activityRef);
    },
  });
}
