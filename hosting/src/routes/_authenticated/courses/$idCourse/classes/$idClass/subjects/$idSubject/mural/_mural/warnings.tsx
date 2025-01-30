import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'

import { CustomLoading } from '@/components/custom/custom-loading'

import { useGetWarningsQuery } from '@/queries/use-warning-wall-query'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/warnings',
)({
  component: WallSubjects,
})

export function WallSubjects() {
  const { idCourse, idClass, idSubject } = Route.useParams()
  const { data: warnings, isError, error, isLoading } = useGetWarningsQuery(idCourse, idClass, idSubject)

  console.log('Dados de warnings:', warnings)

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
      <div className="w-full max-w-screen-lg p-4 sm:p-6">
        <div className="my-8 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name="asdadasdasda" description="Aprender & Crescer" />
        </div>

        <div className="bg-slate-400 p-5">
          {warnings?.map((warning, index) => 
          <h1 key={index}>{warning.message}</h1>
          )}
          </div>
      </div>
    </div>
  )
}
