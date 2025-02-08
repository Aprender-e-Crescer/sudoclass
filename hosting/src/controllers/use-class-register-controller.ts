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
      navigate({ to: '/' })
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
      navigate({ to: '/' })
    },
  })

  return {
    createClass,
    updateClass,
  }
}
