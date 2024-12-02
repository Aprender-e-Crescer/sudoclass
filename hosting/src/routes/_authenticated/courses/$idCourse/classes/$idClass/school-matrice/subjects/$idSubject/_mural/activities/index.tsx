import { Button } from '@/components/ui/button'
import { ActivitiesMaterials } from '@/components/custom/activities-materials'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useListActivitiesQuery } from '@/queries/use-list-activities-query'
import { Plus } from 'lucide-react'
import { CustomLoading } from '@/components/custom/custom-loading'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/activities/',
)({
  component: ListActivity,
})

export function ListActivity() {
  const { data: activities, error, isLoading } = useListActivitiesQuery()
  const { idClass, idCourse, idSubject } = Route.useParams()
  const currentUser = useCurrentUserQuery()
  const { data: user } = useGetUserQuery(currentUser?.data?.uid)

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
          <div className="flex flex-col w-full mx-24 h-auto p-2 md:p-4 overflow-hidden">
            <div className="border-t -ml-4 border-gray-300 my-2 relative -mr-10"></div>
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
            <div className="md:ml-5">
              <div>
                {activities?.map((activity) => {
                  return (
                    <div className="flex flex-col justify-center items-center w-full" key={activity.id}>
                      <ActivitiesMaterials
                        id={activity.id.toString()}
                        idClass={idClass}
                        idCourse={idCourse}
                        idSubject={idSubject}
                        title={activity.title}
                        instruction={activity.instruction}
                        type={user?.type ?? 'aluno'}
                        assigned={0}
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
