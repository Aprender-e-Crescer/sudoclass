import { useMutation } from '@tanstack/react-query'
import { firestore, storage } from '@/services/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, deleteObject } from 'firebase/storage'

interface UpdateActivityData {
  idCourse: string
  idClass: string
  idSubject: string
  idActivity: string
  title: string
  description: string
  deliveryDate: Date
  isAcceptingSubmits: boolean
  attachments: File[]
  oldAttachments: File[]
}

export function useUpdateActivityMutation() {
  return useMutation({
    mutationFn: async (data: UpdateActivityData) => {
      const activityRef = doc(
        firestore,
        'courses',
        data.idCourse,
        'classes',
        data.idClass,
        'subjects',
        data.idSubject,
        'activities',
        data.idActivity,
      )

      const attachmentsToCreate = data.attachments.filter((file) => !data.oldAttachments.some((oldFile) => oldFile.name === file.name))
      const attachmentsToDelete = data.oldAttachments.filter((oldFile) => !data.attachments.some((file) => file.name === oldFile.name))

      await Promise.all(
        attachmentsToCreate.map((file) => {
          const fileRef = ref(
            storage,
            `courses/${data.idCourse}/classes/${data.idClass}/subjects/${data.idSubject}/activities/${data.idActivity}/${file.name}`,
          )

          return uploadBytes(fileRef, file)
        })
      )

      await Promise.all(
        attachmentsToDelete.map((file) => {
          const fileRef = ref(
            storage,
            `courses/${data.idCourse}/classes/${data.idClass}/subjects/${data.idSubject}/activities/${data.idActivity}/${file.name}`,
          )

          return deleteObject(fileRef)
        })
      )

      const updatedActivity = {
        title: data.title,
        description: data.description,
        deliveryDate: data.deliveryDate,
        isAcceptingSubmits: data.isAcceptingSubmits,
      }

      await updateDoc(activityRef, updatedActivity)

      return data.idActivity
    },
  })
}