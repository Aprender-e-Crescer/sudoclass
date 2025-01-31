import { useMutation } from '@tanstack/react-query'
import { firestore } from '@/services/firebase'
import { doc, updateDoc } from 'firebase/firestore'

interface UpdateWarningData {
  id: string
  idCourse: string
  idClass: string
  idSubject: string
  message: string
}

export function useUpdateWarningMutation() {
  return useMutation({
    mutationFn: async (data: UpdateWarningData) => {
      try {
        const warningRef = doc(
          firestore,
          'courses',
          data.idCourse,
          'classes',
          data.idClass,
          'subjects',
          data.idSubject,
          'warnings',
          data.id
        )

        await updateDoc(warningRef, { message: data.message })
      } catch (error) {
        throw new Error('Erro ao atualizar o aviso: ' + error)
      }
    },
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      console.log('Aviso atualizado com sucesso')
    },
  })
}
