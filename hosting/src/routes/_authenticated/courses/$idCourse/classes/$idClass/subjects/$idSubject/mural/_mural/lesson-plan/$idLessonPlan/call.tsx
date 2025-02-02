import { useState, useEffect } from 'react'
import ListStudents from '@/components/custom/list-students'
import { StudentPoster } from '@/components/custom/student-poster'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useGetStudentsQuery } from '@/queries/use-get-students-query'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/call',
)({
  component: Call,
})

export function Call() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { idCourse, idClass } = Route.useParams()
  const { data: students } = useGetStudentsQuery(idCourse, idClass)

  const [studentList, setStudentList] = useState<any[]>([])

  useEffect(() => {
    if (students) {
      setStudentList(students.map((student) => ({ ...student, variant: 'undefined' })))
    }
  }, [students])

  const updateStudentStatus = (id: string, status: string) => {
    setStudentList((prevList) =>
      prevList.map((student) => (student.id === id ? { ...student, variant: status } : student)),
    )
  }
  console.log(studentList)

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
          />
        )}

        <div className="flex justify-around mt-10">
          <Button size="medium">Finalizar Chamada</Button>
        </div>
      </div>
    </div>
  )
}
