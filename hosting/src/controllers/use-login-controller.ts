import { useLoginMutation } from '@/mutations/use-login-mutation'
import { useNavigate } from '@tanstack/react-router'

export function useLoginController() {
  const navigate = useNavigate()
  const { mutateAsync: login } = useLoginMutation({
    onSuccess: () => {
      navigate({ to: '/' })
    },
    onError: (error) => {
      console.error('Erro durante a autenticação:', error.message)
    },
  })

  return { login }
}
