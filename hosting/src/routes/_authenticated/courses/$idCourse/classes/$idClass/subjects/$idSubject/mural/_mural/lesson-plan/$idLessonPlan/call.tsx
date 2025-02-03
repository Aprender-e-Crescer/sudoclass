import ListStudents from '@/components/custom/list-students'
import { StudentPoster } from '@/components/custom/student-poster'
import { Button } from '@/components/ui/button'
import { useCallController } from '@/controllers/use-call-controller'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { doc, DocumentData, DocumentReference, writeBatch } from 'firebase/firestore'
import { When } from 'react-if'
import { firestore } from '@/services/firebase'

export type StudentStatus = 'undefined' | 'present' | 'lack' | 'corrected' | 'notCorrected' | undefined

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/call',
)({
  component: Call,
})

export function Call() {
  const batch = useMemo(() => writeBatch(firestore), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [callHistory, setCallHistory] = useState<{ studentId: string; direction: string }[]>([])

  const { idCourse, idClass, idSubject, idLessonPlan } = Route.useParams()

  const { students, createSchoolCall, error } = useCallController({
    idCourse,
    idClass,
    idSubject,
    idLessonPlan,
  })

  const currentStudent = useMemo(() => {
    if (students.length === 0) return undefined
    return students[Math.min(currentIndex, students.length - 1)]
  }, [students, currentIndex])

  const handleUndo = async () => {
    if (callHistory.length > 0) {
      setCallHistory((prev) => prev.slice(0, -1))

      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleSwipe = async (
    studentId: string,
    profileRef: DocumentReference<DocumentData, DocumentData>,
    direction: string,
  ) => {
    if (direction === 'left') {
      const missingDocRef = doc(
        firestore,
        'courses',
        idCourse,
        'classes',
        idClass,
        'subjects',
        idSubject,
        'lessonPlannings',
        idLessonPlan,
        'missings',
        studentId,
      )
      batch.set(missingDocRef, { studentProfile: profileRef })
    }
    setCallHistory((prev) => [...prev, { studentId, direction }])
    setCurrentIndex((prev) => prev + 1)
  }

  const handleReject = (studentId: string, profileRef: DocumentReference<DocumentData, DocumentData>) => () =>
    handleSwipe(studentId, profileRef, 'left')
  const handleAccept = (studentId: string, profileRef: DocumentReference<DocumentData, DocumentData>) => () =>
    handleSwipe(studentId, profileRef, 'right')

  const handleFinalizeCall = async () => {
    try {
      createSchoolCall(batch)
    } catch (error) {
      throw new Error('There was a failure to save the call')
    }
  }
  if (error) throw new Error(error.message)

  return (
    <div className="flex flex-1">
      <div className="hidden lg:flex flex-col flex-1">
        {students?.map((student) => {
          if (student === undefined) return null

          const currentCallHistory = callHistory.find(({ studentId }) => student.id === studentId)

          return (
            <ListStudents
              key={student.id}
              name={student.displayName}
              picture={student.photoURL}
              variant={
                currentCallHistory?.direction === undefined
                  ? 'undefined'
                  : currentCallHistory?.direction === 'left'
                    ? 'lack'
                    : 'present'
              }
            />
          )
        })}
      </div>

      <div className="w-full pt-2">
        <When condition={!!currentStudent}>
          <StudentPoster
            student={currentStudent!}
            handleReject={handleReject}
            handleAccept={handleAccept}
            handleUndo={handleUndo}
          />
        </When>
        <div className="flex justify-around mt-10">
          <Button onClick={handleFinalizeCall} size="medium">
            Finalizar Chamada
          </Button>
        </div>
      </div>
    </div>
  )
}
