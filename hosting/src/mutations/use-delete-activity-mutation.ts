import { useMutation } from '@tanstack/react-query'
import { firestore, storage } from '@/services/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, listAll, deleteObject } from 'firebase/storage'

interface DeleteActivityData {
  idCourse: string
  idClass: string
  idSubject: string
  idActivity: string
}

export function useDeleteActivityMutation() {
  return useMutation({
    mutationFn: async (data: DeleteActivityData) => {
      const { idCourse, idClass, idSubject, idActivity } = data

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
      )

      const storagePath = `courses/${idCourse}/classes/${idClass}/subjects/${idSubject}/activities/${idActivity}`
      const storageRef = ref(storage, storagePath)

      try {
        const listResult = await listAll(storageRef)

        await Promise.all(listResult.items.map((item) => deleteObject(item)))

        await Promise.all(
          listResult.prefixes.map((prefix) =>
            listAll(prefix).then((subList) => Promise.all(subList.items.map((item) => deleteObject(item)))),
          ),
        )

        await deleteDoc(activityRef)
      } catch (error) {
        console.error('Erro ao deletar atividade:', error)
        throw new Error('Falha ao deletar atividade')
      }
    },
    onError: (error) => {
      console.error('Erro na mutação:', error)
    },
  })
}
