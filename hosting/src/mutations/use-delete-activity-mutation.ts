import { useMutation } from '@tanstack/react-query';
import { firestore, storage } from '@/services/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

interface DeleteActivityData {
  idCourse: string;
  idClass: string;
  idSubject: string;
  idActivity: string;
}

export function useDeleteActivityMutation() {
  return useMutation({
    mutationFn: async (data: DeleteActivityData) => {
      const { idCourse, idClass, idSubject, idActivity } = data;

      const activityRef = doc(
        firestore,
        'courses',
        idCourse,
        'classes',
        idClass,
        'subjects',
        idSubject,
        'activities',
        idActivity,
      );

      const activityDoc = await getDoc(activityRef);

      if (!activityDoc.exists()) {
        throw new Error('Atividade não encontrada');
      }

      const activityData = activityDoc.data();

      if (activityData.attachments && activityData.attachments.length > 0) {
        await Promise.all(
          activityData.attachments.map(async (attachmentUrl: string) => {
            const filePath = decodeURIComponent(attachmentUrl.split('/o/')[1].split('?')[0]);

            const fileRef = ref(storage, filePath);

            await deleteObject(fileRef);
          }),
        );
      }

      await deleteDoc(activityRef);
    },
  });
}