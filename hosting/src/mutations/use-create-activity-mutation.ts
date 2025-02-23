import { useMutation } from '@tanstack/react-query'
import { firestore, storage } from '@/services/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

interface CreateActivityData {
  title: string
  description: string
  attachments: File[]
  deliveryDate: Date
  idCourse: string
  idClass: string
  idSubject: string
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
        )

        const newActivity = {
          title: data.title,
          description: data.description,
          deliveryDate: data.deliveryDate,
          postingDate: serverTimestamp(),
          isAcceptingSubmits: true,
        }

        const docRef = await addDoc(activitiesRef, newActivity)
        const activityId = docRef.id

        await Promise.all(
          data.attachments.map((file) => {
            const fileRef = ref(
              storage,
              `courses/${data.idCourse}/classes/${data.idClass}/subjects/${data.idSubject}/activities/${activityId}/${file.name}`,
            )
            return uploadBytes(fileRef, file)
          }),
        )

        return activityId
      } catch (error) {
        console.error('Error creating activity:', error)
        throw error
      }
    },
  })
}
