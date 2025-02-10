import { useToast } from '@/hooks/use-toast'
import { useCreateClassMutation } from '@/mutations/use-create-class-mutation'
import { useUpdateClassMutation } from '@/mutations/use-update-class-mutation'
import { useNavigate } from '@tanstack/react-router'

export function useClassRegisterController(idCourse: string) {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { mutate: createClass } = useCreateClassMutation({
    idCourse,
    onError: (error) => {
      toast({
        title: 'Erro ao criar turma',
        description: error.message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        title: 'Turma criada com sucesso',
        variant: 'sucesss',
      })
      navigate({ to: `/${idCourse}/course-management` })
    },
  })

  const { mutate: updateClass } = useUpdateClassMutation({
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
      navigate({ to: `/${idCourse}/course-management` })
    },
  })

  return {
    createClass,
    updateClass,
  }
}
