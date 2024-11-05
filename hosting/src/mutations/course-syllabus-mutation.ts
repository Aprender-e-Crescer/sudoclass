import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '@/services/firebase'

export const LIST_SYLLABUS_QUERY_KEY = 'syllabus'

export function useCreateOrEditSyllabusMutation(syllabusID: string) {
  const queryClient = useQueryClient()
  const syllbusRef = doc(firestore, 'syllabus', syllabusID)

  return useMutation({
    mutationKey: ['createOrEditSyllabus'],
    mutationFn: async (values: any) => await updateDoc(syllbusRef, { description: values }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_SYLLABUS_QUERY_KEY] })
    },
  })
}
