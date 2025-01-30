import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'
import { CustomLoading } from '@/components/custom/custom-loading'
import { useGetWarningsQuery } from '@/queries/use-warning-wall-query'
import { Warning } from '@/components/custom/warning'
import { useGetSubjectByIdQuery } from '@/queries/use-get-subject-by-id-query'
import { useGetCourseById } from '@/queries/use-get-course-by-id'

// import { useGetFullUser } from '@/hooks/use-get-full-user'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/warnings',
)({
  component: WallSubjects,
})

export function WallSubjects() {
  const { idCourse, idClass, idSubject } = Route.useParams()
  const { data: warnings, isError, error, isLoading } = useGetWarningsQuery(idCourse, idClass, idSubject)
  const { data: subject} = useGetSubjectByIdQuery(idCourse, idClass, idSubject)
  const { data: course} = useGetCourseById(idCourse)

  // const fullUser = useGetFullUser()
  // console.log('Dados da subject:', subject)
  // console.log('Dados de warnings:', warnings)
  // console.log('Dados do fullUser:', fullUser)

  if (isLoading) {
    return (
      <>
        <div className="w-full h-full flex items-center justify-center">
          <CustomLoading message="Carregando mural" size={70} />
        </div>
      </>
    )
  }

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full max-w-screen-lg p-4 sm:p-6 flex flex-col gap-5">
        <div className="my-8 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name={subject?.name} courseName={course?.name} color={subject?.color} />
        </div>

        <div className="w-full">
          {/* <p>{fullUser?.displayName}</p>
          <img src={fullUser?.photoURL ?? undefined} className="w-16 h-auto rounded-full" alt="" /> */}

          <input
            className="bg-white w-full p-7 border-2 rounded-lg border-slate-300 shadow-2xl"
            type="text"
            placeholder="Escreva um aviso para sua turma"
          />
        </div>

        <div className="flex flex-col p-5 gap-5">
          {warnings?.map((warning, index) => <Warning key={index} comment={warning.message} />)}
        </div>
      </div>
    </div>
  )
}
