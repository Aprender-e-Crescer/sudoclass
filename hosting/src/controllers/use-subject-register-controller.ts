import { toast } from '@/hooks/use-toast'
import { useCreateSubjectMutation } from '@/mutations/use-create-subject-mutation'
import { useDeleteSubjectMutation } from '@/mutations/use-delete-subject-mutation'
import { useUpdateSubjectMutation } from '@/mutations/use-update-subject-mutation'
import { useNavigate } from '@tanstack/react-router'

export function useSubjectRegisterController(idCourse: string, idClass: string) {
  const navigate = useNavigate()

  const { mutate: createSubject } = useCreateSubjectMutation({
    idCourse,
    idClass,
    onSuccess: () => {
      toast({
        title: 'Matéria criada com sucesso',
        variant: 'success',
      })
      navigate({ to: `/courses-management/course/${idCourse}/class/${idClass}` })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar matéria',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
  const { mutate: editSubject } = useUpdateSubjectMutation({
    idCourse,
    idClass,
    onSuccess: () => {
      toast({
        title: 'Matéria editada com sucesso',
        variant: 'success',
      })
      navigate({ to: `/courses-management/course/${idCourse}/class/${idClass}` })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao editar matéria',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
  const { mutate: deleteSubject } = useDeleteSubjectMutation({
    idCourse,
    idClass,
    onSuccess: () => {
      toast({
        title: 'Matéria excluída com sucesso',
        variant: 'success',
      })
      navigate({ to: `/courses-management/course/${idCourse}/class/${idClass}` })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir matéria',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
  return {
    createSubject,
    editSubject,
    deleteSubject,
  }
}
