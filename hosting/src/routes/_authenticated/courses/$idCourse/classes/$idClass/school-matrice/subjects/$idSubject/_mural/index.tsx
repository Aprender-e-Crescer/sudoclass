import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'
import { InputWithAvatar } from '@/components/custom/input-with-avatar'
import { Form, Formik, FormikHelpers } from 'formik'
import { SendHorizontal } from 'lucide-react'
import { Warning } from '@/components/custom/warning'
import { useCreateWarningMutation } from '@/mutations/use-create-warning-mutation'
import { useListWarningsQuery } from '@/queries/use-warning-wall-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { CustomLoading } from '@/components/custom/custom-loading'
import { useGetTeacherQuery } from '@/queries/use-get-teacher-query'
import { useGetStudentQuery } from '@/queries/use-get-student-query'
import { useGetPedagogueQuery } from '@/queries/use-get-pedagogue-query'
import { useGetSubjectByIdQuery } from '@/queries/use-get-subject-by-id-query'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/',
)({
  component: WallSubjects,
})

const initialValues = {
  message: '',
}

export function WallSubjects() {
  const { idSubject } = Route.useParams()
  const { data: warnings, isLoading } = useListWarningsQuery(idSubject)
  const createWarningMutation = useCreateWarningMutation()
  const currentUser = useCurrentUserQuery()
  const { data: user } = useGetUserQuery(currentUser?.data?.uid)
  const { data: subject } = useGetSubjectByIdQuery(parseInt(idSubject))

  if (!user) {
    console.error('Tipo de usuário não encontrado')
    return <div>Usuário não encontrado</div>
  }

  let userName = ''
  let userType = ''

  if (user.type === 'pedagogo') {
    const { data: pedagogue } = useGetPedagogueQuery(user.idPedagogue)
    userName = pedagogue?.name || 'Pedagogo não encontrado'
    userType = 'pedagogo'
  } else if (user.type === 'aluno') {
    const { data: student } = useGetStudentQuery(user.idStudent)
    userName = student?.name || 'Aluno não encontrado'
    userType = 'aluno'
  } else if (user.type === 'professor') {
    const { data: teacher } = useGetTeacherQuery(user.idTeacher)
    userName = teacher?.name || 'Professor não encontrado'
    userType = 'professor'
  }

  console.log('Dados de warnings:', warnings)

  const handleFormSubmit = (values: typeof initialValues, { resetForm }: FormikHelpers<typeof initialValues>) => {
    if (userName) {
      createWarningMutation.mutate({
        message: values.message,
        userId: user.idUser,
        subjectId: parseInt(idSubject, 10),
      })
      resetForm()
    } else {
      console.error('Usuário não autenticado')
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="w-full h-full flex items-center justify-center">
          <CustomLoading message="Carregando WallSubjects" size={70} />
        </div>
      </>
    )
  }

  const validWarnings = Array.isArray(warnings) ? warnings : warnings ? [warnings] : []

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full max-w-screen-lg p-4 sm:p-6">
        <div className="my-8 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name={subject.nome_materia} description="Aprender & Crescer" />
        </div>

        <div className="my-4 mx-auto w-full sm:max-w-md lg:max-w-full">
          <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
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

        {validWarnings.length > 0 && (
          <div className="my-4 mx-auto w-full sm:max-w-md lg:max-w-full flex flex-col gap-4">
            {validWarnings.map((warning) => {
              const date = new Date(warning.data_postagem)
              const formattedDate = !isNaN(date.getTime())
                ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
                : 'Data inválida'

              console.log('Aviso renderizado:', warning)

              return (
                <Warning
                  id={warning.id_aviso}
                  key={warning.id_aviso}
                  name={userName}
                  date={formattedDate}
                  avatarSrc={warning.avatar || ''}
                  comment={warning.mensagem}
                  textAvatar="U"
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
