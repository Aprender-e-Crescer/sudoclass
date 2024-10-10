import { LIST_SCHOOL_MATRICES_QUERY_KEY } from '@/queries/list-school-matrices'
import { firestore } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

export function useCreateSchoolMatriceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createSchoolMatrice'],
    mutationFn: (values: any) => addDoc(collection(firestore, 'schoolMatrices'), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_SCHOOL_MATRICES_QUERY_KEY })
    },
  })
}
