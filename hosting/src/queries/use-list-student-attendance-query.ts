import { firestore } from '@/services/firebase'
import { Frequency, frequencySchema} from '@/models/frequency-scherma'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export const LIST_STUDENT_ATTENDANCE_QUERY_KEY = ['getFrequency']

export function useListStudentAttendanceQuery() {
  return useQuery({
    queryKey: LIST_STUDENT_ATTENDANCE_QUERY_KEY,
    queryFn: async () => {
      const attendanceRef = collection(firestore, 'attendance').withConverter({
        toFirestore: (matrice: Frequency) => matrice,
        fromFirestore: (snapshot) => frequencySchema.parse(snapshot.data()),
      })
      const snapshot = await getDocs(attendanceRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
