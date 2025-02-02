import ListStudents from '@/components/custom/list-students'
import { StudentPoster } from '@/components/custom/student-poster'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useCallController } from '@/controllers/use-call-controller'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/call',
)({
  component: Call,
})

export function Call() {
  const { idCourse, idClass, idSubject, idLessonPlan } = Route.useParams()

  const { studentList, currentIndex, setCurrentIndex, updateStudentStatus, handleReject, handleAccept, handleUndo } =
    useCallController({ idCourse, idClass, idSubject, idLessonPlan })

  return (
    <div className="flex flex-1">
      <div className="flex-1">
        {studentList.map((student) => (
          <ListStudents
            key={student.id}
            name={student.displayName}
            picture={student.photoURL}
            variant={student.variant}
          />
        ))}
      </div>

      <div className="w-full pt-2">
        {currentIndex < (studentList?.length ?? 0) && studentList[currentIndex] && (
          <StudentPoster
            students={studentList}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            updateStudentStatus={updateStudentStatus}
            handleReject={handleReject}
            handleAccept={handleAccept}
            handleUndo={handleUndo}
          />
        )}

        <div className="flex justify-around mt-10">
          <Button size="medium">Finalizar Chamada</Button>
        </div>
      </div>
    </div>
  )
}
