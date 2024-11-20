import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Formik, Form } from 'formik'
import { createFileRoute } from '@tanstack/react-router'
import { IoMdAdd } from 'react-icons/io'

export const Route = createFileRoute('/_authenticated/select-teacher')({
  component: selectTeacher,
})

interface Professor {
  id: number
  name: string
  initials: string
}

const professores: Professor[] = [
  { id: 1, name: 'Jane Cooper', initials: 'J' },
  { id: 2, name: 'Floyd Miles', initials: 'F' },
  { id: 3, name: 'Ronald Richards', initials: 'R' },
  { id: 4, name: 'Marvin McKinney', initials: 'M' },
  { id: 5, name: 'Jerome Bell', initials: 'J' },
]

export function selectTeacher() {
  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={(values) => {
        console.log('Form Submitted:', values)
      }}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full p-5"
        >
          <Professores />
        </Form>
      )}
    </Formik>
  )
}

const colors = [
  'bg-blue-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-green-500',
]

const Professores: React.FC = () => {
  return (
    <div className="p-6">
      <div className="text-2xl font-semibold flex space-x-14">
        <h2 className="font-bold">Aluno</h2>
        <h2 className="font-bold">Professor</h2>
      </div>

      <div className="mt-10 flex justify-between items-center mb-6">
        <h2 className="text-gray-400">Professores cadastrados</h2>
        <div className="w-50 flex items-center">
          <Button icon={<IoMdAdd />} size="large">
            Adicionar Professor
          </Button>
        </div>
      </div>

      <ul className="space-y-4">
        {professores.map((professor, index) => (
          <ProfessorItem
            key={professor.id}
            professor={professor}
            index={index}
          />
        ))}
      </ul>
    </div>
  )
}

const ProfessorItem: React.FC<{ professor: Professor; index: number }> = ({
  professor,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li
      className={`flex items-center gap-4 p-4 rounded-lg shadow-sm ${isHovered ? 'bg-blue-100' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${colors[index % colors.length]} w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold`}
      >
        {professor.initials}
      </div>
      <span className="text-gray-800">{professor.name}</span>
    </li>
  )
}
