import { useMutation } from '@tanstack/react-query'
import { firestore, storage } from '@/services/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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
  existingAttachments?: string[] 
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

      const newAttachmentUrls = await Promise.all(
        data.attachments.map(async (file) => {
          try {
            const fileRef = ref(
              storage,
              `courses/${data.idCourse}/classes/${data.idClass}/subjects/${data.idSubject}/activities/${data.idActivity}/${file.name}`,
            )
            await uploadBytes(fileRef, file)
            return await getDownloadURL(fileRef)
          } catch (error) {
            console.error('Erro no upload do arquivo:', file.name, error)
            throw error
          }
        }),
      )

      const updatedAttachments = [...(data.existingAttachments || []), ...newAttachmentUrls]

      const updatedActivity = {
        title: data.title,
        description: data.description,
        deliveryDate: data.deliveryDate,
        isAcceptingSubmits: data.isAcceptingSubmits,
        attachments: updatedAttachments, 
      }

      await updateDoc(activityRef, updatedActivity)

      return data.idActivity
    },
  })
}