import React, { useState, useEffect } from 'react'
import ListStudents from '@/components/custom/list-students'
import { StudentPoster } from '@/components/custom/student-poster'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useListNotesQuery } from '@/queries/use-list-notes-query'

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
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/call',
)({
  component: Call,
})

export function Call() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [studentList, setStudentList] = useState<any[]>([])

  const { data: notesData, isLoading, isError } = useListNotesQuery(1)

  useEffect(() => {
    if (notesData) {
      const updatedStudents = notesData.map((student: any) => ({
        student_id: student.idAluno,
        name: student.nomeAluno,
        variant: 'undefined',
      }))
      setStudentList(updatedStudents)
    }
  }, [notesData])

  const updateStudentStatus = (id: string, status: any) => {
    setStudentList((prevList) =>
      prevList.map((student) => (student.student_id === id ? { ...student, variant: status } : student)),
    )
  }

  const handleAddCall = () => {
    console.log('Finalizando chamada...')
    console.log('Lista de Alunos:', studentList)

    setStudentList((prevList) =>
      prevList.map((student) => ({ ...student, variant: 'undefined' })),
    )

    setCurrentIndex(0)
    setDate(undefined)

    console.log('Chamada finalizada!')
  }

  if (isLoading) return <div>Carregando alunos...</div>
  if (isError) return <div>Erro ao carregar alunos.</div>

  return (
    <>
      <div className="flex flex-1">
        <div className="flex-1">
          {studentList.map((student) => {
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`
            return (
              <ListStudents
                key={student.student_id}
                name={student.name}
                picture={avatarUrl}
                variant={student.variant}
              />
            )
          })}
        </div>

        <div className="w-full pt-2">
          {currentIndex < studentList.length && (
            <StudentPoster
              students={studentList}
              imageUrl={`https://ui-avatars.com/api/?name=${encodeURIComponent(studentList[currentIndex].name)}&background=random`}
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
    </>
  )
}
