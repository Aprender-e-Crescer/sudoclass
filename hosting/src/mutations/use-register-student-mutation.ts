import { Student } from '@/models/student-schema'
import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface MutationResults {
  onSuccess: () => void
  onError: () => void
}

export function useRegisterStudentMutation({ onSuccess, onError }: MutationResults) {
  return useMutation({
    mutationKey: ['register-student'],
    mutationFn: (values: Student) => api.post('/alunos', values),
    onSuccess,
    onError,
  })
}