import { useState } from 'react'
import { useParams } from 'react-router-dom'
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
import { doc, setDoc, updateDoc, increment } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { useCreateCommentMutation } from '@/mutations/use-create-comment-mutation'
import { useCommentsQuery } from '@/queries/use-comment-query'

export const Route = createFileRoute('/view-activity')({
  component: ViewActivity,
})

const initialValues = {
  value: '',
  comment: '',
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
  const { activityID } = useParams<{ activityID: string }>()
  const { data: students } = useStudentsListQuery()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const { comments, fetchComments } = useCommentsQuery(activityID!)
  const { createComment, loading: isSendingComment } = useCreateCommentMutation()

  const handleStudentClick = (student: Student) => {
    if (selectedStudent?.id === student.id) {
      setSelectedStudent(null)
    } else {
      setSelectedStudent(student)
    }
  }

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    await createComment(activityID!, {
      message: inputValue,
      sentBy: 'User ID or Name', // Ajuste o identificador do usuário aqui
    })
    setInputValue('')
    fetchComments()
  }

  async function upgradeNote(grade: number) {
    const upgradeNoteRef = doc(firestore, 'activities', activityID!)
    await setDoc(upgradeNoteRef, { grade: grade })
    setSuccessMessage('Nota alterada com sucesso!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  async function addNote(grade: number) {
    try {
      const addNoteRef = doc(firestore, 'activities', activityID!)
      await updateDoc(addNoteRef, {
        grade: increment(grade),
      })

      setSuccessMessage('Nota alterada com sucesso!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setSuccessMessage('Erro ao alterar nota!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  return (
    <>
      <div className="hidden md:flex flex-grow">
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
                const grade = parseInt(values.value)
                upgradeNote(grade)
                addNote(grade)
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
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <div>
              <Input type="file" className="h-96 w-80" />
            </div>
            <div className="flex flex-col w-full max-w-[400px] gap-y-3 border border-gray-300 p-3 rounded-md">
              <div className="flex gap-x-2 text-gray-500">
                <User />
                <p>Comentários</p>
              </div>
              {comments.map((comment) => (
                <TeacherComment
                  key={comment.id}
                  avatarSrc=""
                  comment={comment.message}
                  date={comment.timestamp.toLocaleString()}
                  name={comment.sentBy}
                  textAvatar={comment.sentBy.charAt(0)}
                />
              ))}
              <form onSubmit={handleSendComment} className="flex">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escreva seu comentário"
                  className="flex-grow"
                  disabled={isSendingComment}
                />
                <Button type="submit" variant="blueButton" size="small" className="ml-2">
                  {isSendingComment ? 'Enviando...' : 'Enviar'}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ViewActivity
