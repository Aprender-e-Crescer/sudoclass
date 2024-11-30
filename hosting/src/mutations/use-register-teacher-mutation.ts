import { RegisterRequests } from '@/models/teachers-schema'
import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface MutationResults {
  onSuccess: () => void,
  onError: () => void
}

export function useRegisterTeacherMutation({ onSuccess, onError }: MutationResults) {
  return useMutation({
    mutationKey: ['register-teacher'],
    mutationFn: (values: RegisterRequests) => {
       return api.post("/teacher", values)
      },
    onSuccess,
    onError,
  })
}
