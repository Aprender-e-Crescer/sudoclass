import { useState } from 'react'
import ListStudents from '@/components/custom/list-students'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { InputNoteSchema } from '@/models/input-note-schema'
import { InputForm } from '@/components/custom/text-input'
import { useAddGradeMutation } from '@/mutations/use-add-grade-mutation'
import { z } from 'zod'

const validateSearch = z.object({
  idStudent: z.string().optional(),
})

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/activities/$idActivity/correction',
)({
  component: Correction,
  validateSearch,
})

const initialValues = {
  value: '',
  comment: '',
}

interface Student {
  id: string
  name: string
  picture: string
}

function Correction() {
  const { idActivity } = Route.useParams()

  // Lista de estudantes mockada
  const students: Student[] = [
    {
      id: '1',
      name: 'João Silva',
      picture: 'https://placekitten.com/200/200',
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      picture: 'https://placekitten.com/200/200',
    },
    {
      id: '3',
      name: 'Pedro Souza',
      picture: 'https://placekitten.com/200/200',
    },
  ]

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [sucessMessage, setSuccessMessage] = useState('')

  const handleStudentClick = (student: Student) => {
    if (selectedStudent?.id === student.id) {
      setSelectedStudent(null)
    } else {
      setSelectedStudent(student)
    }
  }

  const { mutate: addGrade } = useAddGradeMutation()

  const handleSubmitNote = async (values: any) => {
    const { value } = values
    const grade = parseFloat(value)

    if (selectedStudent?.id && idActivity) {
      const studentId = parseInt(selectedStudent.id, 10)
      const activityId = parseInt(idActivity, 10)

      addGrade({ activityId, studentId, grade })
      setSuccessMessage('Nota atribuída com sucesso!')
    }
  }

  return (
    <>
      <div className="hidden md:flex flex-grow">
        <div>
          {students.map((student) => (
            <div key={student.id} onClick={() => handleStudentClick(student)} className="cursor-pointer">
              <ListStudents name={student.name} picture={student.picture} variant="corrected" />
            </div>
          ))}
        </div>
        <div className="max-h-screen border border-gray-300"></div>
        {selectedStudent && (
          <div className="hidden md:flex flex-col justify-center w-full items-center gap-y-10 mt-5">
            <h2 className="text-xl">Avaliar {selectedStudent.name}</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(InputNoteSchema)}
              onSubmit={handleSubmitNote}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className="flex flex-col items-center justify-start gap-y-4">
                  <div className="flex gap-x-4 items-start">
                    <div className="h-screen max-h-16">
                      <InputForm
                        name="value"
                        id="value"
                        label="nota"
                        onChange={(e) => setFieldValue('value', e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <Button type="submit" variant="blueButton" size="small" className="mt-3">
                      Devolver
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            {sucessMessage && <p className="text-green-500">{sucessMessage}</p>}
            <div>
              <Input type="file" className="h-96 w-80" />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center md:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-center items-center w-full">
                <div>
                  {students.map((student) => (
                    <ListStudents key={student.id} name={student.name} picture={student.picture} variant="corrected" />
                  ))}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col justify-center w-full items-center gap-y-10 mt-5">
                <div className="flex gap-x-10">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={toFormikValidationSchema(InputNoteSchema)}
                    onSubmit={(values) => {
                      console.log(values)
                    }}
                  >
                    {({ handleSubmit }) => (
                      <Form onSubmit={handleSubmit} className="flex flex-col items-center justify-start gap-y-4">
                        <div className="flex gap-x-4 items-start">
                          <div className="h-screen max-h-16">
                            <InputForm name="value" id="value" label="nota" />
                          </div>
                          <Button type="submit" variant="blueButton" size="small" className="mt-3">
                            Devolver
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>

                <div>
                  <Input type="file" className="h-96 w-80" />
                </div>

                <div className="flex flex-col w-full max-w-[400px] gap-y-3 border border-gray-300 p-3 rounded-md"></div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

export default Correction
