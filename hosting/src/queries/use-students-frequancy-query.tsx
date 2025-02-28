import { firestore } from '@/services/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { attendanceSchema, Attendance } from '@/models/students-frequancy-schema'

export function useAttendanceQuery(schoolMatriceId: string, subjectId: string) {
  return useQuery({
    queryKey: ['getAttendances', schoolMatriceId, subjectId],
    queryFn: async () => {
      const attendancesRef = collection(
        firestore,
        'schoolMatrices',
        schoolMatriceId,
        'subjects',
        subjectId,
        'attendances',
      ).withConverter({
        toFirestore: (attendance: Attendance) => ({
          createdAt: attendance.createdAt,
          students: attendance.students,
        }),
        fromFirestore: (snapshot) =>
          attendanceSchema.parse({
            id: snapshot.id,
            ...snapshot.data(),
          }),
      })


      const snapshot = await getDocs(attendancesRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
