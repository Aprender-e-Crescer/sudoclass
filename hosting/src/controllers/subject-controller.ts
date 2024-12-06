import { toast } from '@/hooks/use-toast'
import { useDeleteSubjectMutation } from '@/mutations/use-delete-subject-mutation'
import { useQueryClient } from '@tanstack/react-query'

export function useSubjectController() {
  const queryClient = useQueryClient()
  const { mutateAsync: deleteSubject } = useDeleteSubjectMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] }) 
      toast({
        title: 'Sucesso!',
        description: 'A matéria foi excluída.',
        variant: 'success',
      })
    },
    onError: () => 
      toast({
        title: 'Erro!',
        description: 'Erro ao excluir a matéria.',
        variant: 'destructive',
      }),
  })

  return { deleteSubject }
}
