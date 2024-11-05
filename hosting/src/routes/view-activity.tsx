import { useState, FormEvent } from 'react'
import ListStudents from '@/components/custom/list-students'
import { TeacherComment } from '@/components/custom/teacher-comment'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { createFileRoute } from '@tanstack/react-router'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { InputNoteSchema } from '@/models/input-note-schema'
import { InputForm } from '@/components/custom/text-input'
import { User } from 'lucide-react'
import { collection } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { useCreateCommentMutation } from '@/mutations/use-create-comment-mutation'

export const Route = createFileRoute('/view-activity')({
  component: ViewActivity,
})

const initialValues = {
  value: '',
  comment: '', // Adicionado para gerenciar o valor do comentário
}

interface Student {
  id: string
  address: {
    city: string
    neighborhood: string
    state: string
    street: string
    streetNumber: number
  }
  cityOfBirth: string
  cpf: string
  dateOfBirth: string
  email: string
  name: string
  telephone: string
}

function ViewActivity() {
  const { data: students } = useStudentsListQuery()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [inputValue, setInputValue] = useState<string>('')

  // // Ajuste os parâmetros conforme necessário
  // const schoolMatriceId = 'yourSchoolMatriceId' // Substitua com a lógica para obter esse valor
  // const subjectId = 'yourSubjectId' // Substitua com a lógica para obter esse valor
  // const activityId = 'yourActivityId' // Substitua com a lógica para obter esse valor
  // const correctionId = 'yourCorrectionId' // Substitua com a lógica para obter esse valor
  // const userId = 'yourUserId' // Substitua com a lógica para obter esse valor

  // const commentsRef = collection(
  //   firestore,
  //   'schoolMatrices',
  //   schoolMatriceId,
  //   'subjects',
  //   subjectId,
  //   'activities',
  //   activityId,
  //   'correction',
  //   correctionId,
  //   'comments',
  // )

  const handleStudentClick = (student: Student) => {
    if (selectedStudent?.id === student.id) {
      setSelectedStudent(null)
    } else {
      setSelectedStudent(student)
    }
  }

  // const handleSendComment = async (e: FormEvent) => {
  //   e.preventDefault()
  //   if (inputValue.trim() === '') return

  //   await useCreateCommentMutation(commentsRef, inputValue, userId)
  //   setInputValue('')
  // }

  return (
    <>
      <div className="hidden md:flex flex-grow">
        ''
        <div>
          {students?.map((student) => (
            <div key={student.id} onClick={() => handleStudentClick(student)} className="cursor-pointer">
              <ListStudents name={student.name} picture="" variant="corrected" />
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
              onSubmit={(values) => {
                console.log(values)
              }}
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
            <div>
              <Input type="file" className="h-96 w-80" />
            </div>
            <div className="flex flex-col w-full max-w-[400px] gap-y-3 border border-gray-300 p-3 rounded-md">
              <div className="flex gap-x-2 text-gray-500">
                <User />
                <p>Comentários</p>
              </div>
              <TeacherComment avatarSrc="" comment="teste" date="17/10/2024" name="Enzo Guis" textAvatar="EG" />
              <form className="flex">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="escreva seu comentário"
                  className="flex-grow"
                />
                <Button type="submit" variant="blueButton" size="small" className="ml-2">
                  Enviar
                </Button>
              </form>
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
                  {students?.map((student) => (
                    <ListStudents key={student.id} name={student.name} picture="" variant="corrected" />
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

                <div className="flex flex-col w-full max-w-[400px] gap-y-3 border border-gray-300 p-3 rounded-md">
                  <TeacherComment avatarSrc="" comment="teste" date="17/10/2024" name="Enzo Guis" textAvatar="EG" />
                  <form className="flex">
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="escreva seu comentário"
                      className="flex-grow"
                    />
                    <Button type="submit" variant="blueButton" size="small" className="ml-2">
                      Enviar
                    </Button>
                  </form>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

export default ViewActivity
