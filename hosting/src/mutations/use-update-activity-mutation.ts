import { useMutation } from '@tanstack/react-query'
import { firestore } from '@/services/firebase'
import { doc, updateDoc } from 'firebase/firestore'

interface UpdateActivityData {
  idCourse: string
  idClass: string
  idSubject: string
  idActivity: string
  title: string
  description: string
  deliveryDate: Date
  isAcceptingSubmits: boolean
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
