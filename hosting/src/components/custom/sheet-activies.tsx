import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { useState } from 'react'

export function SheetActivies() {
  const { data: students } = useStudentsListQuery()
  const [selectedStudents, setSelectedStudents] = useState<{ [key: string]: boolean }>({})

  const handleCheckboxChange = (studentId: string) => {
    const currentSelection = selectedStudents[studentId]
    const newSelection = {
      ...selectedStudents,
      [studentId]: !currentSelection,
    }

    setSelectedStudents(newSelection)
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <button className="py-2 px-4 rounded-lg border border-blue-500 text-blue-400">Todos os alunos</button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Selecione os alunos que deseja atribuir atividade</SheetTitle>
            <SheetDescription>
              {students?.map((student) => (
                <div key={student.id}>
                  <input
                    type="checkbox"
                    name=""
                    id="{`student-${student.id}`}"
                    checked={!!selectedStudents[student.id]}
                    onChange={() => handleCheckboxChange(student.id)}
                  />
                  <label htmlFor={`student-${student.id}`}>{student.name}</label>
                </div>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
