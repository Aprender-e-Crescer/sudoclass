import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'

interface MutationResults {
  onSuccess: () => void
  onError: () => void
}

interface AdminData {
  nome: string
  cpf: string
}

export function useRegisterAdminMutation({ onSuccess, onError }: MutationResults) {
  return useMutation({
    mutationKey: ['register-admin'],
    mutationFn: (adminData: AdminData) => api.post('/pedagogos', adminData),
    onSuccess,
    onError,
  })
}
