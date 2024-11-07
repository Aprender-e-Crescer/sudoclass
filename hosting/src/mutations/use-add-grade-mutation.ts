import { firestore } from '@/services/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useMutation } from '@tanstack/react-query'


export function useAddGradeMutation(schoolMatriceId: string, subjectId: string, activityId: string) {
    return useMutation({
      mutationKey: ['createSchoolMatrice', schoolMatriceId, subjectId, activityId  ],
      mutationFn: (values: any) => addDoc(collection(firestore, 'schoolMatrices', schoolMatriceId, 'subjects', subjectId, 'activities', activityId, 'correction'), values)
    })
  }
  