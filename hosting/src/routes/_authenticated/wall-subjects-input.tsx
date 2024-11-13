import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'
import { ActivitiesMaterials } from '@/components/custom/activities-materials'
import { InputWithAvatar } from '@/components/custom/input-with-avatar'
import { Form, Formik, FormikHelpers } from 'formik'
import { SendHorizontal } from 'lucide-react'
import { TeacherComment } from '@/components/custom/teacher-comment'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCreateWarningMutation } from '@/mutations/use-create-warning-mutation'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'

export const Route = createFileRoute('/wall-subjects-input')({
  component: WallSubjectInput,
})

const commentSchema = z.object({
  message: z.string().min(1, 'A mensagem não pode estar vazia'),
  sentBy: z.string().min(1, 'O autor não pode estar vazio'),
})

const initialValues = {
  message: '',
  sentBy: 'Nome do usuário', // Substitua pelo valor correto
}

// Função para buscar os comentários do Firestore
const fetchCommentsFromFirestore = async (schoolMatriceId: string, subjectId: string) => {
  const commentsRef = collection(firestore, 'schoolMatrices', schoolMatriceId, 'subjects', subjectId, 'warning')
  const querySnapshot = await getDocs(commentsRef)
  return querySnapshot.docs.map((doc) => doc.data())
}

export function WallSubjectInput() {
  const schoolMatriceId = 'aQjvxCKlEuHc9YQEedCQ' // Substitua pelo valor real
  const subjectId = 'zGTOAwnKJBjFSmayHxJo' // Substitua pelo valor real
  //const queryClient = useQueryClient()

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', schoolMatriceId, subjectId],
    queryFn: () => fetchCommentsFromFirestore(schoolMatriceId, subjectId),
  })

  const createWarningMutation = useCreateWarningMutation(schoolMatriceId, subjectId)

  // Definindo os tipos para o handleFormSubmit
  const handleFormSubmit = (values: typeof initialValues, { resetForm }: FormikHelpers<typeof initialValues>) => {
    // Chame a mutação com os valores do formulário
    createWarningMutation.mutate({
      message: values.message,
      sentBy: values.sentBy,
    })

    resetForm()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg p-4 sm:p-6">
        <div className="my-8 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name="Matéria" description="Nome do curso" />
        </div>

        <div className="my-4 mx-auto w-full sm:max-w-md lg:max-w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(commentSchema)}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <InputWithAvatar
                  placeholder="Digite sua mensagem"
                  id="message"
                  name="message"
                  //value={values.message}
                  //onChange={handleChange}
                  avatar=""
                  icon={
                    <button type="submit">
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
            <TeacherComment
              name={comment.sentBy}
              date="hoje"
              textAvatar="a"
              avatarSrc=""
              key={index}
              comment={comment.message}
            />
          ))}
        </div>

        <div className="my-4 flex flex-col items-center w-full space-y-4">
          <ActivitiesMaterials
            id="1"
            to=""
            title="Professor atribuiu uma nova atividade:"
            dateActivity="ontem"
            instructions=""
            iconColor=""
            type="teacher"
          />
          <ActivitiesMaterials
            id="2"
            to=""
            title="Professor atribuiu uma nova atividade:"
            dateActivity="ontem"
            instructions=""
            iconColor=""
            type="teacher"
          />
        </div>
      </div>
    </div>
  )
}
