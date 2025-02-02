import { useState, useEffect } from 'react'
import { useGetStudentsQuery } from '@/queries/use-get-students-query'
import { useCreateSchoolCallMutation } from '@/mutations/use-create-call-mutation'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export type StudentStatus = 'undefined' | 'present' | 'lack' | 'corrected' | 'notCorrected' | undefined

interface Student {
  id: string
  displayName: string
  photoURL: string
  profileRef: DocumentReference<DocumentData, DocumentData>
  variant?: StudentStatus
}

interface CallControllerProps {
  idCourse: string
  idClass: string
  idSubject: string
  idLessonPlan: string
}

export function useCallController({ idCourse, idClass, idSubject, idLessonPlan }: CallControllerProps) {
  const { data: students } = useGetStudentsQuery(idCourse, idClass)
  const createSchoolCall = useCreateSchoolCallMutation(idCourse, idClass, idSubject, idLessonPlan)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [studentList, setStudentList] = useState<Student[]>([])
  const [callHistory, setCallHistory] = useState<{ studentId: string; direction: string }[]>([])

  useEffect(() => {
    if (students) {
      setStudentList(students.map((student) => ({ ...student, variant: 'undefined' as StudentStatus })))
    }
  }, [students])

  const updateStudentStatus = (id: string, status: StudentStatus) => {
    setStudentList((prevList) =>
      prevList.map((student) => (student.id === id ? { ...student, variant: status } : student)),
    )
  }

  const handleSwipe = async (direction: string) => {
    if (currentIndex >= 0 && currentIndex < studentList.length) {
      const studentId = studentList[currentIndex].id
      const profileRef = studentList[currentIndex].profileRef

      try {
        const status: StudentStatus = direction === 'left' ? 'lack' : 'present'
        updateStudentStatus(studentId, status)

        if (direction === 'left') {
          await createSchoolCall.mutateAsync({ studentProfileRef: profileRef })
        }

        setCallHistory((prev) => [...prev, { studentId, direction }])
        setCurrentIndex((prevIndex) => (prevIndex + 1 < studentList.length ? prevIndex + 1 : prevIndex))
      } catch (error) {
        console.error('Erro ao criar a chamada:', error)
      }
    }
  }

  const handleReject = () => handleSwipe('left')
  const handleAccept = () => handleSwipe('right')

  const handleUndo = async () => {
    if (callHistory.length > 0) {
      const lastCall = callHistory[callHistory.length - 1]
      setCallHistory((prev) => prev.slice(0, -1))

      setCurrentIndex(studentList.findIndex((student) => student.id === lastCall.studentId))
    }
  }

  return {
    studentList,
    currentIndex,
    setCurrentIndex,
    updateStudentStatus,
    handleSwipe,
    handleReject,
    handleAccept,
    handleUndo,
  }
}
