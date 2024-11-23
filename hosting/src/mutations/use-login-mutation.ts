import { auth, functions } from '@/services/firebase'
import { httpsCallable } from 'firebase/functions'
import { LoginData, loginDataSchema } from '@/models/login-schema'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { signInWithCustomToken } from 'firebase/auth'

const loginWithCPF = httpsCallable<LoginData, string>(functions, 'loginWithCPF')

interface LoginResponses {
  onSuccess: () => void
  onError: (error: unknown) => void
}

export function useLoginMutation({ onSuccess, onError }: LoginResponses) {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (credentials: LoginData) => {
      const payload = loginDataSchema.parse(credentials)
      const { data } = await loginWithCPF(payload)
      const token = z.string().parse(data)

      return signInWithCustomToken(auth, token).then(() => console.log(auth.currentUser?.metadata))
    },
    onSuccess,
    onError,
  })
}
