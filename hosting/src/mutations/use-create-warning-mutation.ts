import { useMutation } from '@tanstack/react-query'
import { firestore } from '@/services/firebase'
import { collection, addDoc, doc } from 'firebase/firestore'

interface CreateWarningData {
  message: string
  idCourse: string
  idClass: string
  idSubject: string
  authorId: string  // O ID do autor (usuário)
}

export function useCreateWarningMutation() {
  return useMutation({
    mutationFn: async (data: CreateWarningData) => {
      try {
        const warningsRef = collection(
          firestore,
          'courses',
          data.idCourse,
          'classes',
          data.idClass,
          'subjects',
          data.idSubject,
          'warnings',
        )

        const authorRef = doc(firestore, 'profile', data.authorId)

        const docRef = await addDoc(warningsRef, {
          message: data.message,
          sentByProfile: authorRef, 
          sentDate: new Date(),
        })

        return docRef.id
      } catch (error) {
        throw new Error('Erro ao criar o aviso: ' + error)
      }
    },
    onError: (error) => {
      console.error(error)
    },
    onSuccess: (data) => {
      console.log('Aviso criado com sucesso. ID:', data)
    },
  })
}
