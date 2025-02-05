import ListStudents, { ListStudentsProps } from '@/components/custom/list-students'
import { StudentPoster } from '@/components/custom/student-poster'
import { Button } from '@/components/ui/button'
import { useCallController } from '@/controllers/use-call-controller'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { When } from 'react-if'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'

function getStudentVariant(direction: string | undefined): ListStudentsProps['variant'] {
  if (direction === undefined) return 'undefined'
  if (direction === 'left') return 'lack'
  if (direction === 'right') return 'present'

  return 'undefined'
}

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idsLessonPlan/call',
)({
  params: {
    parse: z.object({
      idCourse: z.string(),
      idClass: z.string(),
      idSubject: z.string(),
      idsLessonPlan: z.preprocess((ids) => {
        if (typeof ids !== 'string') return ids

        return ids.split(',')
      }, z.array(z.string())),
    }).parse,
  },
  component: Call,
})

export function Call() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [callHistory, setCallHistory] = useState<
    {
      profileRef: DocumentReference<DocumentData, DocumentData>
      direction: string
    }[]
  >([])

  const { idCourse, idClass, idSubject, idsLessonPlan } = Route.useParams()

  const { students, createSchoolCall, isCreateSchoolCallPending } = useCallController({
    idCourse,
    idClass,
    idSubject,
  })

  const currentStudent = useMemo(() => {
    if (students.length === 0) return undefined

    return students[Math.min(currentIndex, students.length - 1)]
  }, [students, currentIndex])

  const navigate = useNavigate()

  const handleUndo = async () => {
    if (callHistory.length === 0) return

    setCallHistory((prev) => prev.slice(0, -1))
    setCurrentIndex((prev) => prev - 1)
  }

  const handleSwipe = async (profileRef: DocumentReference<DocumentData, DocumentData>, direction: string) => {
    setCallHistory((prev) => [...prev, { profileRef: profileRef, direction }])
    setCurrentIndex((prev) => prev + 1)
  }

  const handleReject = (profileRef: DocumentReference<DocumentData, DocumentData>) => () =>
    handleSwipe(profileRef, 'left')
  const handleAccept = (profileRef: DocumentReference<DocumentData, DocumentData>) => () =>
    handleSwipe(profileRef, 'right')

  const handleFinalizeCall = async () => {
    await createSchoolCall({
      idCourse,
      idClass,
      idSubject,
      idsLessonPlan,
      profileRefs: callHistory
        .filter(({ direction }) => direction === 'left')
        .map(({ profileRef: profileId }) => profileId),
    })
   
    navigate({
      to: `/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/lesson-plan/lesson-plan-view`,
      params: { idCourse, idClass, idSubject }
    })
  }

  const listStudentsProps = students?.map((student) => {
    const currentCallHistory = callHistory.find(({ profileRef }) => student.profileRef.id === profileRef.id)

    return {
      key: student.id,
      name: student.displayName,
      picture: student.photoURL,
      variant: getStudentVariant(currentCallHistory?.direction),
    }
  })

  return (
    <div className="flex flex-1">
      <div className="hidden lg:flex flex-col flex-1">
        {listStudentsProps?.map(({ key, name, picture, variant }) => (
          <ListStudents key={key} name={name} picture={picture} variant={variant} />
        ))}
      </div>

      <div className="w-full pt-2">
        <When condition={!!currentStudent}>
          <StudentPoster
            isButtonsDisabled={isCreateSchoolCallPending}
            student={currentStudent!}
            handleReject={handleReject}
            handleAccept={handleAccept}
            handleUndo={handleUndo}
          />
        </When>
        <div className="flex justify-around mt-10">
          <Button onClick={handleFinalizeCall} size="medium" disabled={isCreateSchoolCallPending}>
            {isCreateSchoolCallPending ? 'Carregando...' : ' Finalizar Chamada'}
          </Button>
        </div>
      </div>
    </div>
  )
}
