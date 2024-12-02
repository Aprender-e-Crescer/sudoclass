import { toast } from '@/hooks/use-toast'
import { useRegisterClassMutation } from '@/mutations/mutation-register-class-form'
import { useDeleteClassMutation } from '@/mutations/use-delete-class-mutations'
import { useUpdateClassMutation } from '@/mutations/use-update-class-mutation'
import { useQueryClient } from '@tanstack/react-query'

export function useClassesController() {
  const queryClient = useQueryClient()
  const { mutateAsync: registerClassForm } = useRegisterClassMutation()
  const { mutateAsync: deleteClass } = useDeleteClassMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] }),
        toast({
          title: 'Sucesso!',
          description: 'A turma foi excluida.',
          variant: 'success',
        })
    },
    onError: () =>
      toast({
        title: 'Erro!',
        description: 'Erro ao excluir a turma.',
        variant: 'destructive',
      }),
  })

  const { mutateAsync: updateClass } = useUpdateClassMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] }),
        toast({
          title: 'Sucesso!',
          description: 'A turma foi atualizada.',
          variant: 'success',
        })
    },
    onError: () =>
      toast({
        title: 'Erro!',
        description: 'Erro ao atualizar a turma.',
        variant: 'destructive',
      }),
  })

  return {
    registerClassForm,
    deleteClass,
    updateClass,
  }
}
