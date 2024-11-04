import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'
import { firestore } from '@/services/firebase'

export const LIST_SYLLABUS_QUERY_KEY = 'syllabus'

export function useCreateOrEditSyllabusMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createOrEditSyllabus'],
    mutationFn: async (values: any) => await addDoc(collection(firestore, 'syllabus'), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_SYLLABUS_QUERY_KEY] })
    },
  })
}
