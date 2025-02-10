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
      const lessonPlanRef = doc(
        firestore, 
        'courses', 
        data.idCourse, 
        'classes', 
        data.idClass, 
        'subjects', 
        data.idSubject, 
        'lessonPlannings', 
        data.id
      )

      try {
        await updateDoc(lessonPlanRef, {
          'teachingDetails.content': data.teachingDetails.content,
          'teachingDetails.methodology': data.teachingDetails.methodology,
          'teachingDetails.resources': data.teachingDetails.resources,
        })
      } catch (error) {
        throw new Error(`Erro ao atualizar a aula: ${error instanceof Error ? error.message : error}`);
      }
    },
    onError: (error) => {
      console.error('Falha ao atualizar a aula:', error);
    },
    onSuccess: () => {
      console.log('Aula atualizada com sucesso');
    },
  })
}
