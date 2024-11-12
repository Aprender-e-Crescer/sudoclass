import { Warning } from '@/models/warning-schema'
import { WARNINGS_WALL_QUERY_KEY } from '@/queries/use-warning-wall-query'
import { firestore } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

export function useCreateWarningMutation(schoolMatriceId: string, subjectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createWarning'],
    mutationFn: (values: Warning) =>
      addDoc(collection(firestore, 'schoolMatrices', schoolMatriceId, 'subjects', subjectId, 'warning'), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WARNINGS_WALL_QUERY_KEY(schoolMatriceId, subjectId) })
    },
  })
}
