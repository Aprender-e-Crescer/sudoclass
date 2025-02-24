import { useToast } from '@/hooks/use-toast'
import { useCreateClassMutation } from '@/mutations/use-create-class-mutation'
import { useUpdateClassMutation } from '@/mutations/use-update-class-mutation'
import { useNavigate } from '@tanstack/react-router'

export function useClassRegisterController(idCourse: string) {
  const navigate = useNavigate({ from: '/courses/$idCourse/classes/management' })
  const { toast } = useToast()

  const { mutateAsync: createClass } = useCreateClassMutation({
    idCourse,
    onError: (error) => {
      toast({
        title: 'Erro ao criar turma',
        description: error.message,
        variant: 'destructive',
      })
    },
    onSuccess: (idClass) => {
      toast({
        title: 'Turma criada com sucesso',
        variant: 'sucesss',
      })
      navigate({ replace: true, to: `/courses/$idCourse/classes/$idClass/management`, params: { idClass, idCourse } })
    },
  })

  const { mutateAsync: updateClass } = useUpdateClassMutation({
    idCourse,
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar turma',
        description: error.message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        title: 'Turma editada com sucesso',
        variant: 'sucesss',
      })
      navigate({ replace: true, to: `/courses/$idCourse/classes/management`, params: { idCourse } })
    },
  })

  return {
    createClass,
    updateClass,
  }
}
