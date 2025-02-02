import React, { useState, useEffect } from 'react'
import ListStudents from '@/components/custom/list-students'
import { StudentPoster } from '@/components/custom/student-poster'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useGetStudentQuery } from '@/queries/use-get-student-query'

export function DatePickerDemo({
  date,
  setDate,
}: {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="medium"
          variant="ghostBlack"
          className={cn('bg-slate-200 justify-start text-left', !date && 'text-muted-foreground')}
        >
          {date ? format(date, 'PPP') : <span>Escolha a data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50 bg-gray-200">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={(selectedDate) => {
            console.log('Data selecionada:', selectedDate)
            setDate(selectedDate)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/call',
)({
  component: Call,
})

export function Call() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { idCourse, idClass } = Route.useParams()
  const { data: students } = useGetStudentQuery(idCourse, idClass)

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

  const handleAddCall = () => {
    console.log('Finalizando chamada...')
    console.log('Lista de Alunos:', studentList)

    setStudentList((prevList) => prevList.map((student) => ({ ...student, variant: 'undefined' })))
    setCurrentIndex(0)
    setDate(undefined)

    console.log('Chamada finalizada!')
  }

  return (
    <div className="flex flex-1">
      <div className="flex-1">
        {studentList.map((student) => (
          <ListStudents
            key={student.id}
            name={student.displayName}
            picture={student.photoUrl}
            variant={student.variant}
          />
        ))}
      </div>

      <div className="w-full pt-2">
        {currentIndex < (studentList?.length ?? 0) && studentList[currentIndex] && (
          <StudentPoster
            students={studentList[currentIndex]}
            imageUrl={studentList[currentIndex].photoUrl}
            currentIndex={currentIndex}
            onStudentUpdate={updateStudentStatus}
            setCurrentIndex={setCurrentIndex}
            date={date}
          />
        )}

        <div className="flex justify-around mt-2">
          <DatePickerDemo date={date} setDate={setDate} />
        </div>

        <div className="flex justify-around mt-2">
          <Button onClick={handleAddCall} size="medium">
            Finalizar Chamada
          </Button>
        </div>
      </div>
    </div>
  )
}
