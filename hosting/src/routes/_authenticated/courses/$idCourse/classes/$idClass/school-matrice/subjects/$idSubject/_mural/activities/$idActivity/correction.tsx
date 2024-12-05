import { useState } from 'react'
import ListStudents from '@/components/custom/list-students'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { InputNoteSchema } from '@/models/input-note-schema'
import { InputForm } from '@/components/custom/text-input'
import { useAddGradeMutation } from '@/mutations/use-add-grade-mutation'
import { z } from 'zod'
import { useGetLinkFromActivity } from '@/queries/use-get-link-from-activity-query'

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
  variant: 'undefined' | 'corrected'
}

function Correction() {
  const { idActivity } = Route.useParams()

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'João Silva',
      picture: 'https://cdn-icons-png.flaticon.com/512/4537/4537019.png',
      variant: 'undefined',
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      picture: 'https://cdn-icons-png.flaticon.com/512/4537/4537019.png',
      variant: 'undefined',
    },
    {
      id: '3',
      name: 'Pedro Souza',
      picture: 'https://cdn-icons-png.flaticon.com/512/4537/4537019.png',
      variant: 'undefined',
    },
  ])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [formKey, setFormKey] = useState(0)

  const handleStudentClick = (student: Student) => {
    if (selectedStudent?.id === student.id) {
      setSelectedStudent(null)
    } else {
      setSelectedStudent(student)
    }
    setSuccessMessage('') // Reseta a mensagem de sucesso
    setFormKey((prevKey) => prevKey + 1)
  }

  const { data: link } = useGetLinkFromActivity(Number(idActivity), Number(selectedStudent?.id))

  const { mutate: addGrade } = useAddGradeMutation()

  const handleSubmitNote = async (values: any, { resetForm }: { resetForm: () => void }) => {
    const { value } = values
    const grade = parseFloat(value)

    if (selectedStudent?.id && idActivity) {
      const studentId = parseInt(selectedStudent.id, 10)
      const activityId = parseInt(idActivity, 10)

      addGrade({ activityId, studentId, grade })

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudent.id ? { ...student, variant: 'corrected' } : student,
        ),
      )

      setSuccessMessage('Nota atribuída com sucesso!')
      resetForm()
    }
  }

  return (
    <>
      <div className="hidden md:flex w-full justify-between">
        <div>
          {students.map((student) => (
            <div key={student.id} onClick={() => handleStudentClick(student)} className="cursor-pointer">
              <ListStudents name={student.name} picture={student.picture} variant={student.variant} />
            </div>
          ))}
          <div className="w-full border border-gray-300"></div>
        </div>

        {selectedStudent && (
          <div className="hidden md:flex flex-col justify-center min-w items-center gap-y-10 mt-5 border-2 shadow-md p-5 rounded-lg">
            <h2 className="text-xl font-semibold">Aluno sendo avaliado: {selectedStudent.name}</h2>

            <div className="border p-5 rounded-lg">
              <p className="font-semibold">Anexo do Aluno:</p>
              <div className="flex flex-col ">
                <a href={link}>
                  <p className="text-blue-600 block w-32 h-6 overflow-hidden text-ellipsis">{link}</p>
                </a>
              </div>
            </div>
            <Formik
              key={formKey}
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(InputNoteSchema)}
              onSubmit={handleSubmitNote}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className="flex flex-col items-center justify-start gap-y-4">
                  <div className="flex flex-col ">
                    <h2 className="text-xl font-semibold">Atribuir Nota</h2>
                    <div className="h-screen max-h-16">
                      <InputForm
                        name="value"
                        id="value"
                        label="nota"
                        placeholder="Insira a nota"
                        onChange={(e) => setFieldValue('value', e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <Button type="submit" variant="blueButton" size="manage" className="mt-2">
                      Devolver
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </div>
        )}
        <div></div>
      </div>

      <div className="flex flex-col md:hidden">
  <Accordion type="single" collapsible>
    {students.map((student) => (
      <AccordionItem key={student.id} value={String(student.id)} className="flex flex-col w-full">
        <div className="flex flex-col w-full">
          <AccordionTrigger onClick={() => handleStudentClick(student)} className="flex justify-between items-center">
            <ListStudents name={student.name} picture={student.picture} variant={student.variant} />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col justify-center w-full h-auto">
            {selectedStudent?.id === student.id && (
              <div className="flex flex-col justify-center items-center gap-y-5 mt-4 border border-gray-200 shadow-md w-full rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800">Aluno sendo avaliado: {student.name}</h2>

                <div className="border p-4 w-full rounded-lg">
                  <p className="font-medium text-gray-700">Anexo do Aluno:</p>
                  <div className="mt-2">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <p className="text-blue-600 block w-full h-6 overflow-hidden text-ellipsis">{link}</p>
                    </a>
                  </div>
                </div>

                <Formik
                  key={formKey}
                  initialValues={initialValues}
                  validationSchema={toFormikValidationSchema(InputNoteSchema)}
                  onSubmit={handleSubmitNote}
                >
                  {({ handleSubmit, setFieldValue }) => (
                    <Form
                      onSubmit={handleSubmit}
                      className="flex flex-col items-center justify-start gap-y-4 w-full"
                    >
                      <div className="flex flex-col w-full">
                        <h2 className="text-lg font-medium text-gray-800">Atribuir Nota</h2>
                        <div className="mt-2">
                          <InputForm
                            name="value"
                            id="value"
                            label="Nota"
                            placeholder="Insira a nota"
                            onChange={(e) => setFieldValue('value', e.target.value.replace(/\D/g, ''))}
                          />
                        </div>
                        <Button type="submit" variant="blueButton" size="manage" className="mt-4 w-full">
                          Devolver
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>

                {successMessage && <p className="text-green-500">{successMessage}</p>}
              </div>
            )}
          </AccordionContent>
        </div>
      </AccordionItem>
    ))}
  </Accordion>
</div>

    </>
  )
}

export default Correction
