import React, { useState, useEffect } from 'react'
import ListStudents from '@/components/custom/list-students'
import { StudentPoster } from '@/components/custom/student-poster'
import { createFileRoute } from '@tanstack/react-router'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
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

export const Route = createFileRoute('/call-screen')({
  component: callScreen,
})

export function callScreen() {
  const { data: students } = useStudentsListQuery()
  const [studentList, setStudentList] = useState(students || [])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    if (students && students.length > 0) {
      setStudentList(students)
      setCurrentIndex(students.length - 1)
      console.log('Lista de alunos carregada:', students)
    }
  }, [students])

  const updateStudentStatus = (id, status) => {
    setStudentList((prevList) =>
      prevList.map((student) => (student.id === id ? { ...student, variant: status } : student)),
    )
  }

  const addCall = async (values: { studentId: string; status: string; date: Date }) => {
    try {
      const callRef = collection(firestore, 'student', 'U2IvXW4yX8IE5QksHSox', 'call')
      const newCall = {
        studentId: values.studentId,
        status: values.status,
        date: values.date,
      }

      console.log('Tentando adicionar chamada:', newCall)
      await addDoc(callRef, newCall)
      console.log('Chamada adicionada com sucesso:', newCall)
    } catch (error) {
      console.error('Erro ao adicionar chamada:', error.message || error)
    }
  }

  const handleAddCall = () => {
    console.log('Current Index:', currentIndex)
    console.log('Student List:', studentList)

    if (currentIndex === 0 || !studentList[currentIndex]) {
      console.error('Nenhum aluno selecionado.')
      return
    }

    if (!date) {
      console.error('Data não está definida.')
      return
    }

    const values = {
      studentId: studentList[currentIndex].id,
      status: 'active',
      date: date,
    }

    console.log('Valores antes de adicionar a chamada:', values)
    addCall(values)
  }

  // const [copyStudentList, setCopyStudentList] = useState(students || []);

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
          />
          <div className="flex justify-around mb-10">
            <Button onClick={handleAddCall}>Finalizar Chamada</Button>
          </div>
          <div className="flex justify-around mb-6">
            <DatePickerDemo date={date} setDate={setDate} />
          </div>
        </div>
      </div>
    </>
  )
}
