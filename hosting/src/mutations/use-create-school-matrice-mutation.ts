import { LIST_SCHOOL_MATRICES_QUERY_KEY } from '@/queries/use-list-school-matrices-query'
import { firestore } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

type SchoolMatrice = {
  name: string;
  numberOfClasses?: string;
  workload?: string;
  description?: string
  startDate?: string;
  endDate?: string;
  startOfRegistration?: string;
  endOfRegistration?: string;
  numberOfVacancies?: string;
  gradeLevel?: string
  subjects?: string[]
}

export function useCreateSchoolMatriceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createSchoolMatrice'],
    mutationFn: (values: SchoolMatrice) => addDoc(collection(firestore, 'schoolMatrices'), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_SCHOOL_MATRICES_QUERY_KEY })
    },
  })
}
