import { RESPONSIBLES_QUERY_KEY } from '@/queries/list-responsible-queries'
import { firestore } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

export function useCreateResponsiblesMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createResponsible'],
    mutationFn: (values: any) => addDoc(collection(firestore, 'responsibles'), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESPONSIBLES_QUERY_KEY })
    },
  })
}
