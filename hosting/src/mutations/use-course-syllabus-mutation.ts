import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '@/services/firebase'

export const LIST_SYLLABUS_QUERY_KEY = 'syllabus'

type SyllabusValues = {
  description: string
}

export function useCreateOrEditSyllabusMutation(syllabusID: string) {
  const queryClient = useQueryClient()
  const syllabusRef = doc(firestore, 'syllabus', syllabusID)

  return useMutation({
    mutationKey: ['createOrEditSyllabus'],
    mutationFn: async (values: SyllabusValues) => await updateDoc(syllabusRef, { description: values.description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_SYLLABUS_QUERY_KEY] })
    },
  })
}
