import { firestore, storage } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, DocumentReference } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

interface CreateSubmitData {
  idCourse: string
  idClass: string
  idSubject: string
  idActivity: string
  studentProfile: DocumentReference
  studentAttachments: File[]
}

export function useCreateSubmitMutation() {
  return useMutation({
    mutationFn: async (data: CreateSubmitData) => {
      const { idCourse, idClass, idSubject, idActivity, studentProfile, studentAttachments } = data

      if (!idCourse || !idClass || !idSubject || !idActivity || !studentProfile || !studentAttachments.length) {
        throw new Error('Dados de entrada inválidos')
      }

      const submitRef = collection(
        firestore,
        'courses',
        idCourse,
        'classes',
        idClass,
        'subjects',
        idSubject,
        'activities',
        idActivity,
        'submits',
      )

      const newSubmit = {
        note: null,
        isEvaluated: false,
        studentProfile,
      }

      const docRef = await addDoc(submitRef, newSubmit)
      const submitId = docRef.id

      try {
        await Promise.all(
          studentAttachments.map((file) => {
            const filePath = `courses/${idCourse}/classes/${idClass}/subjects/${idSubject}/activities/${idActivity}/submits/${submitId}/${file.name}`
            const fileRef = ref(storage, filePath)
            return uploadBytes(fileRef, file)
          }),
        )
      } catch (error) {
        console.error('Erro ao fazer upload dos arquivos:', error)
        throw new Error('Falha ao fazer upload dos arquivos')
      }

      return submitId
    },
    onError: (error) => {
      console.error('Erro na mutação:', error)
    },
  })
}
