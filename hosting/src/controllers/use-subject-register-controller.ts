import { toast } from '@/hooks/use-toast'
import { useCreateSubjectMutation } from '@/mutations/use-create-subject-mutation'
import { useNavigate } from '@tanstack/react-router'

export function useSubjectRegisterController(idCourse: string, idClass: string) {
  const navigate = useNavigate()

  const { mutate: createSubject } = useCreateSubjectMutation({
    idCourse,
    idClass,
    onSuccess: ({ id }) => {
      toast({
        title: 'Matéria criada com sucesso',
        variant: 'success',
      })
      navigate({ to: `/courses/${idCourse}/classes/${idClass}/subjects/${id}/mural/warnings` })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar matéria',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
  return {
    createSubject,
  }
}
