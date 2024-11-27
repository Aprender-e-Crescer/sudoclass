import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'
import { InputWithAvatar } from '@/components/custom/input-with-avatar'
import { Form, Formik, FormikHelpers } from 'formik'
import { SendHorizontal } from 'lucide-react'
import { Warning } from '@/components/custom/warning'
import { useCreateWarningMutation } from '@/mutations/use-create-warning-mutation'
import { useListWarningsQuery } from '@/queries/use-warning-wall-query'
import { useState } from 'react'
import { useGetUserQuery } from '@/queries/use-get-user-query'
import { useGetPedagogueQuery } from '@/queries/use-get-pedagogue-query'
import { useGetStudentQuery } from '@/queries/use-get-student-query'
import { useGetTeacherQuery } from '@/queries/use-get-teacher-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { WarningType } from '@/models/warning-schema'

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
  const { data: warnings, isLoading, isError } = useListWarningsQuery(idSubject)

  // Depuração: Verificando o que está sendo retornado pela query
  console.log('Dados de warnings:', warnings)

  const createWarningMutation = useCreateWarningMutation()
  const currentUser = useCurrentUserQuery()
  const { data: user } = useGetUserQuery(currentUser?.data?.uid)

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
  } else {
    console.error('Tipo de usuário inválido')
    return <div>Tipo de usuário inválido</div>
  }

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
    return <div>Loading...</div>
  }

  // Garantir que warnings seja um array antes de mapear
  const validWarnings = Array.isArray(warnings) ? warnings : [warnings] // Caso seja um objeto, transforma em array

  console.log('Warnings depois de processado:', validWarnings)

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full max-w-screen-lg p-4 sm:p-6">
        <div className="my-8 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name="Matéria" description="Nome do curso" />
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

        <div className="my-4 mx-auto w-full sm:max-w-md lg:max-w-full flex flex-col gap-4">
          {validWarnings.length === 0 ? (
            <div>Não há avisos disponíveis</div>
          ) : (
            validWarnings.map((warning: WarningType, index: number) => (
              <Warning key={index} name={userName} date="Agora" avatarSrc="" comment={warning.message} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
