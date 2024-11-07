import { Activity } from '@/models/activity-schema'
import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

export function useCreateActivityMutation() {
  return useMutation({
    mutationKey: ['createSchoolMatrice'],
    mutationFn: (values: Activity) =>
      addDoc(
        collection(
          firestore,
          'schoolMatrices',
          'aQjvxCKlEuHc9YQEedCQ',
          'subjects',
          'zGTOAwnKJBjFSmayHxJo',
          'activities',
        ),
        values,
      ),
  })
}
