import { Warning } from '@/models/warning-schema'
import { WARNINGS_WALL_QUERY_KEY } from '@/queries/warning-wall-query'
import { firestore } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

export function useCreateWarningMutation(schoolMatriceId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createWarning'],
    mutationFn: (warning: Warning) => addDoc(collection(firestore, 'schoolMatrices', schoolMatriceId, 'warning'), warning),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WARNINGS_WALL_QUERY_KEY })
    },
  })
}
