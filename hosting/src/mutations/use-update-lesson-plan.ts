import { useMutation } from '@tanstack/react-query'
import { firestore } from '@/services/firebase'
import { doc, updateDoc } from 'firebase/firestore'

interface UpdateLessonPlanData {
  id: string
  idCourse: string
  idClass: string
  idSubject: string
  teachingDetails: {
    content: string
    methodology: string
    resources: string
  }
}

export function useUpdateLessonPlanMutation() {
  return useMutation({
      mutationFn: async (data: UpdateLessonPlanData) => {
        try {
          const lessonPlanRef = doc(firestore, 'courses', data.idCourse, 'classes', data.idClass, 'subjects', data.idSubject, 'lessonPlans', data.id);
          await updateDoc(lessonPlanRef, { teachingDetails: data.teachingDetails });
          console.log('Aula atualizada com sucesso')
          } catch (error) {
            throw new Error('Erro ao atualizar a aula: ' + error)
          }
          },
        onError: (error) => {
          console.error(error)
        },
        onSuccess: () => {
          console.log('Aula atualizada com sucesso')
        },
      })
    }

        // export function useUpdateWarningMutation() {
        //   return useMutation({
        //     mutationFn: async (data: UpdateWarningData) => {
        //       try {
        //         const warningRef = doc(
        //           firestore,
        //           'courses',
        //           data.idCourse,
        //           'classes',
        //           data.idClass,
        //           'subjects',
        //           data.idSubject,
        //           'warnings',
        //           data.id
        //         )
        
        //         await updateDoc(warningRef, { message: data.message })
        //       } catch (error) {
        //         throw new Error('Erro ao atualizar o aviso: ' + error)
        //       }
        //     },
        //     onError: (error) => {
        //       console.error(error)
        //     },
        //     onSuccess: () => {
        //       console.log('Aviso atualizado com sucesso')
        //     },
        //   })
        // }
        