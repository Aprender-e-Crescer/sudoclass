import { useToast } from '@/hooks/use-toast'
import { useAddPasswordRequestMutation } from '@/mutations/use-add-password-request-mutation'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export function usePasswordRequestController() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const { mutate: addPasswordRequest } = useAddPasswordRequestMutation({
    onError: (error) => {
      toast({
        title: 'Erro ao solicitar senha',
        description: error.message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        title: 'Solicitação enviada!',
        description: 'Aguarde a aprovação de um(a) coordenador(a).',
        variant: 'success',
      })
      navigate({ to: '/request-sent' })
    },
  })
  return {
    addPasswordRequest,
  }
}
