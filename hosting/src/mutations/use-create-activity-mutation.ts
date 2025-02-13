import { useMutation } from '@tanstack/react-query';
import { firestore, storage } from '@/services/firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface CreateActivityData {
  title: string;
  description: string;
  attachments: File[];
  deliveryDate: Date;
  idCourse: string;
  idClass: string;
  idSubject: string;
}

export function useCreateActivityMutation() {
  return useMutation({
    mutationFn: async (data: CreateActivityData) => {
      try {
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
          postingDate: serverTimestamp(),
          isAcceptingSubmits: true,
          attachments: [],
        };

        const docRef = await addDoc(activitiesRef, newActivity);
        const activityId = docRef.id;

        console.log('Atividade criada com ID:', activityId);

        const attachmentUrls = await Promise.all(
          data.attachments.map(async (file) => {
            try {
              const fileRef = ref(
                storage,
                `courses/${data.idCourse}/classes/${data.idClass}/subjects/${data.idSubject}/activities/${activityId}/${file.name}`,
              );
              await uploadBytes(fileRef, file);
              return await getDownloadURL(fileRef);
            } catch (error) {
              console.error('Erro no upload do arquivo:', file.name, error);
              throw error;
            }
          }),
        );

        await updateDoc(doc(
          firestore,
          'courses',
          data.idCourse,
          'classes',
          data.idClass,
          'subjects',
          data.idSubject,
          'activities',
          activityId
        ), {
          attachments: attachmentUrls,
        });

        return activityId;
      } catch (error) {
        console.error('Erro ao criar atividade:', error);
        throw error;
      }
    },
  });
}
