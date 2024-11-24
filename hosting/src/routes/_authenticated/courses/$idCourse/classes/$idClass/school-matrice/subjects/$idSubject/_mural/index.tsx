import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'
import { InputWithAvatar } from '@/components/custom/input-with-avatar'
import { Form, Formik, FormikHelpers } from 'formik'
import { SendHorizontal } from 'lucide-react'
import { Warning } from '@/components/custom/warning'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useCreateWarningMutation } from '@/mutations/use-create-warning-mutation'
import { useListWarningsQuery } from '@/queries/use-warning-wall-query'
import { warningSchema } from '@/models/warning-schema'
import { useState } from 'react'
import { useGetFullUser } from '@/hooks/use-get-full-user'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/',
)({
  component: WallSubjects,
})

const initialValues = {
  message: '',
  sentBy: 'Nome do usuário',
}

export function WallSubjects() {
  const { idSubject } = Route.useParams()
  const { data: initialComments = [], isLoading } = useListWarningsQuery(idSubject)
  const createWarningMutation = useCreateWarningMutation()
  const [comments, setComments] = useState(initialComments)
  const { user } = useGetFullUser()

  const handleFormSubmit = (values: typeof initialValues, { resetForm }: FormikHelpers<typeof initialValues>) => {
    if (user) {
      createWarningMutation.mutate({
        message: values.message,
        userId: user.idUser,
        subjectId: parseInt(idSubject, 10),
      })
      setComments((prevComments) => [...prevComments, { message: values.message, sentBy: values.sentBy }])

      resetForm()
    } else {
      console.error('Usuário não autenticado')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full max-w-screen-lg p-4 sm:p-6">
        <div className="my-8 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name="Matéria" description="Nome do curso" />
        </div>

        <div className="my-4 mx-auto w-full sm:max-w-md lg:max-w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(warningSchema)}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, errors, touched, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <InputWithAvatar
                  placeholder="Digite sua mensagem"
                  id="message"
                  name="message"
                  onChange={handleChange}
                  avatar=""
                  icon={
                    <button type="submit" aria-label="Enviar mensagem">
                      <SendHorizontal />
                    </button>
                  }
                />
                {errors.message && touched.message && <div className="text-red-500 text-sm">{errors.message}</div>}
              </Form>
            )}
          </Formik>
        </div>
        <div className="my-4 mx-auto w-full sm:max-w-md lg:max-w-full flex flex-col gap-4">
          {comments.map((comment, index) => (
            <Warning key={index} name={comment.sentBy} date="Agora" avatarSrc="" comment={comment.message} />
          ))}
        </div>
      </div>
    </div>
  )
}
