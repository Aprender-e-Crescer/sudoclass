import React, { useState } from 'react'
import ListStudents from '@/components/custom/list-students'
import { StudentPoster } from '@/components/custom/student-poster'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
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
  const mockedStudents = [
    {
      id: '1',
      name: 'Alice',
      picture:
        'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png',
      variant: 'undefined',
    },
    {
      id: '2',
      name: 'Bob',
      picture:
        'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png',
      variant: 'undefined',
    },
    {
      id: '3',
      name: 'Charlie',
      picture:
        'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png',
      variant: 'undefined',
    },
  ]
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [studentList, setStudentList] = useState(mockedStudents)
  const [currentIndex, setCurrentIndex] = useState(0)

  const updateStudentStatus = (id: string, status: any) => {
    setStudentList((prevList) =>
      prevList.map((student) => (student.id === id ? { ...student, variant: status } : student)),
    )
  }

  const handleAddCall = () => {
    console.log('Finalizando chamada...')
    console.log('Lista de Alunos:', studentList)

    const callData = studentList.map((student) => ({
      studentId: student.id,
      status: student.variant === 'present' ? true : false,
    }))

    setTimeout(() => {
      console.log('Dados da chamada enviados:', callData)
    })

    setStudentList(mockedStudents)
    setCurrentIndex(0)
    setDate(undefined)
  }

  return (
    <>
      <div className="flex flex-1">
        <div className="flex-1">
          {studentList.map((student) => (
            <ListStudents key={student.id} name={student.name} picture={student.picture} variant={student.variant} />
          ))}
        </div>
        <div className="w-full">
          <StudentPoster
            students={studentList}
            currentIndex={currentIndex}
            onStudentUpdate={updateStudentStatus}
            setCurrentIndex={setCurrentIndex}
            date={date}
          />
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
