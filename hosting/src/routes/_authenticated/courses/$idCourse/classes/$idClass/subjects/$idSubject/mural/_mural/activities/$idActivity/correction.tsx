import { useState, useEffect } from 'react'
import ListStudents from '@/components/custom/list-students'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { InputNoteSchema } from '@/models/input-note-schema'
import { InputForm } from '@/components/custom/text-input'
import { useAddGradeMutation } from '@/mutations/use-add-grade-mutation'
import { useStudentListBySubjectQuery } from '@/queries/use-list-students-subject'
import { z } from 'zod'
import { useGetLinkFromActivity } from '@/queries/use-get-link-from-activity-query'
import { useListNotesQuery } from '@/queries/use-list-notes-query'

const validateSearch = z.object({
  idStudent: z.string().optional(),
})

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/$idActivity/correction',
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
  const { idActivity, idSubject } = Route.useParams()
  const {
    data: studentsData,
    isLoading,
    isError,
  } = useListNotesQuery(Number(idSubject))
  console.log(studentsData)
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    if (studentsData) {
      const updatedStudents = studentsData.map((student: any) => ({
        id: student.idAluno,
        name: student.nomeAluno,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(student.nomeAluno)}&background=random`,
        variant: 'undefined',
      }))
      setStudents(updatedStudents)
    }
  }, [studentsData])

  const handleStudentClick = (student: Student) => {
    setSelectedStudent((prev) => (prev?.id === student.id ? null : student))
    setSuccessMessage('')
    setFormKey((prevKey) => prevKey + 1)
  }

  const { data: link } = useGetLinkFromActivity(
    Number(idActivity),
    Number(selectedStudent?.id),
  )
  const { mutate: addGrade } = useAddGradeMutation()

  const handleSubmitNote = async (
    values: any,
    { resetForm }: { resetForm: () => void },
  ) => {
    const grade = parseFloat(values.value)
    if (selectedStudent?.id && idActivity) {
      const studentId = parseInt(selectedStudent.id, 10)
      const activityId = parseInt(idActivity, 10)

      addGrade({ activityId, studentId, grade })

      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, variant: 'corrected' }
            : student,
        ),
      )
      setSuccessMessage('Nota atribuída com sucesso!')
      resetForm()
    }
  }

  if (isLoading) return <div>Carregando alunos...</div>
  if (isError) return <div>Erro ao carregar alunos.</div>

  return (
    <>
      <div className="hidden md:flex w-full justify-between">
        <div>
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => handleStudentClick(student)}
              className="cursor-pointer"
            >
              <ListStudents
                name={student.name}
                picture={student.picture}
                variant={student.variant}
              />
            </div>
          ))}
          <div className="w-full border border-gray-300"></div>
        </div>

        {selectedStudent && (
          <div className="hidden md:flex flex-col justify-center items-center gap-y-10 mt-5 border-2 shadow-md p-5 rounded-lg">
            <h2 className="text-xl font-semibold">
              Aluno sendo avaliado: {selectedStudent.name}
            </h2>
            <div className="border p-5 rounded-lg">
              <p className="font-semibold">Anexo do Aluno:</p>
              <a href={link}>
                <p className="text-blue-600 block w-32 h-6 overflow-hidden text-ellipsis">
                  {link}
                </p>
              </a>
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
                  className="flex flex-col items-center gap-y-4"
                >
                  <InputForm
                    name="value"
                    id="value"
                    label="Nota"
                    placeholder="Insira a nota"
                    onChange={(e) =>
                      setFieldValue('value', e.target.value.replace(/\D/g, ''))
                    }
                  />
                  <Button type="submit" variant="blueButton" size="manage">
                    Devolver
                  </Button>
                </Form>
              )}
            </Formik>
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
          </div>
        )}
      </div>

      {/* Mobile accordion */}
      <div className="flex flex-col md:hidden">
        <Accordion type="single" collapsible>
          {students.map((student) => (
            <AccordionItem key={student.id} value={String(student.id)}>
              <AccordionTrigger onClick={() => handleStudentClick(student)}>
                <ListStudents
                  name={student.name}
                  picture={student.picture}
                  variant={student.variant}
                />
              </AccordionTrigger>
              <AccordionContent>
                {selectedStudent?.id === student.id && (
                  <div className="p-4 border rounded-lg">
                    <h2 className="text-lg font-semibold">
                      Aluno sendo avaliado: {student.name}
                    </h2>
                    <a href={link}>
                      <p className="text-blue-600">{link}</p>
                    </a>
                    <Formik
                      key={formKey}
                      initialValues={initialValues}
                      validationSchema={toFormikValidationSchema(
                        InputNoteSchema,
                      )}
                      onSubmit={handleSubmitNote}
                    >
                      {({ handleSubmit, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                          <InputForm
                            name="value"
                            placeholder="Insira a nota"
                            onChange={(e) =>
                              setFieldValue(
                                'value',
                                e.target.value.replace(/\D/g, ''),
                              )
                            }
                          />
                          <Button type="submit">Devolver</Button>
                        </Form>
                      )}
                    </Formik>
                    {successMessage && <p>{successMessage}</p>}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}

export default Correction
