import { Button } from '@/components/ui/button'
import { ActivitiesMaterials } from '@/components/custom/activities-materials'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useListActivitiesQuery } from '@/queries/use-list-activities-query'
import { Plus } from 'lucide-react'
import { CustomLoading } from '@/components/custom/custom-loading'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
// import { useGetUserQuery } from '@/queries/use-get-user-query'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/',
)({
  component: ListActivity,
})

export function ListActivity() {
  const { idClass, idCourse, idSubject } = Route.useParams()
  const {
    data: activities,
    error,
    isLoading,
  } = useListActivitiesQuery(parseInt(idSubject))
  const currentUser = useCurrentUserQuery()
  const { data: user } = useGetUserQuery(currentUser?.data?.uid)

  function capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  if (isLoading)
    return (
      <>
        <div className="w-full h-full flex items-center justify-center">
          <CustomLoading message="Carregando atividades" size={70} />
        </div>
      </>
    )
  if (error) return <div>Erro ao carregar atividades: {error.message}</div>

  return (
    <>
      <div className="min-h-screen overflow-y-hidden w-full">
        <div className="flex flex-col md:flex-row overflow-hidden">
          <div className="flex flex-col w-full md:mx-24 h-auto p-2 md:p-4 overflow-hidden">
            {user?.type === 'professor' && (
              <div>
                <Link
                  to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/activities/manage"
                  params={{
                    idCourse,
                    idClass,
                    idSubject,
                  }}
                  search={{
                    action: 'create',
                  }}
                >
                  <Button
                    className="md:ml-5 bg-blue-600 mt-5  mb-3 text-sm rounded-s-full rounded-e-full"
                    iconPosition="left"
                    icon={<Plus />}
                    variant="blueButton"
                    size="small"
                  >
                    Criar
                  </Button>
                </Link>
              </div>
            )}
            <div className="md:ml-5">
              <div>
                {activities
                  ?.sort(
                    (a, b) =>
                      new Date(b.datePosting ?? 0).getTime() -
                      new Date(a.datePosting ?? 0).getTime(),
                  )
                  .map((activity) => {
                    return (
                      <div
                        className="flex flex-col justify-center items-center w-full"
                        key={activity.id}
                      >
                        <ActivitiesMaterials
                          id={activity.id.toString()}
                          idClass={idClass}
                          idCourse={idCourse}
                          idSubject={idSubject}
                          title={capitalizeFirstLetter(activity.title)}
                          instruction={activity.instruction}
                          type={user?.type ?? 'aluno'}
                          assigned={3}
                          pending={26}
                          dateActivity={
                            activity.datePosting
                              ? (() => {
                                  const date = new Date(activity.datePosting)
                                  date.setDate(date.getDate() + 1)
                                  return date.toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                  })
                                })()
                              : undefined
                          }
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
