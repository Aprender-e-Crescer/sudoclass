import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'
import { firestore } from '@/services/firebase'

export function useCreateSubjectMutation(schoolMatriceId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createSubject'],
    mutationFn: (values: any) => addDoc(collection(firestore, 'subjects'), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getSubjects', schoolMatriceId] })
    },
  })
}
