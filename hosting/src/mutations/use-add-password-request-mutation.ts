import { RequestChangePasswordData } from '@/models/credential-schema'
import { functions } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { httpsCallable } from 'firebase/functions'

interface AddPasswordRequestInput {
  onError: (error: Error) => void
  onSuccess: () => void
}
interface AddPasswordRequestDTO {
  cpf: string
  password: string
}

const requestChangePassword = httpsCallable<RequestChangePasswordData, string>(functions, 'requestChangePassword')

export function useAddPasswordRequestMutation({ onError, onSuccess }: AddPasswordRequestInput) {
  return useMutation({
    mutationKey: ['addPasswordRequest'],
    mutationFn: async ({ cpf, password }: AddPasswordRequestDTO) => requestChangePassword({ cpf, password }),
    onError,
    onSuccess,
  })
}
