import { toast } from '@/hooks/use-toast'
import { useRegisterClassMutation } from '@/mutations/mutation-register-class-form'
import { useDeleteClassMutation } from '@/mutations/use-delete-class-mutations'

export function useClassesController() {
  const { mutateAsync: registerClassForm } = useRegisterClassMutation()
  const { mutateAsync: deleteClass } = useDeleteClassMutation({
    onSuccess: () =>
      toast({
        title: 'Sucesso!',
        description: 'A turma foi excluida.',
        variant: 'success',
      }),
    onError: () =>
      toast({
        title: 'Erro!',
        description: 'Erro ao excluir a turma.',
        variant: 'destructive',
      }),
  })

  return {
    registerClassForm,
    deleteClass,
  }
}
