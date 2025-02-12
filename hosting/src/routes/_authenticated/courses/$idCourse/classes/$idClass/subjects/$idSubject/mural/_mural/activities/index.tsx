import { CustomLoading } from '@/components/custom/custom-loading'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getActivitiesQueryOptions } from '@/queries/use-list-activities-query'
import ActivitiesMaterials from '@/components/custom/activities-materials'
import { ClipboardList, PlusIcon } from 'lucide-react'
import { Else, If, Then, When } from 'react-if'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/',
)({
  component: ListActivity,
})

export function ListActivity() {
  const { idClass, idCourse, idSubject } = Route.useParams()

  const fullUser = useGetFullUser()

  const teacherAndAdmin = fullUser.role === 'teacher' || fullUser.role === 'admin'

  const { data: activityList, isLoading: activityListLoading } = useQuery(
    getActivitiesQueryOptions(idCourse, idClass, idSubject),
  )

  if (activityListLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CustomLoading message="Carregando atividades" size={70} />
      </div>
    )
  }

  return (
    <>
      <div className=" flex flex-col mx-8 gap-2 mt-4">
        <div>
          <When condition={teacherAndAdmin}>
            <Link
              to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities/create"
              params={{
                idCourse,
                idClass,
                idSubject,
              }}
            >
              <button className="flex bg-blue-600 text-white p-2 rounded-3xl hover:bg-blue-700 transition-all">
                <PlusIcon />
                Criar
              </button>
            </Link>
          </When>
        </div>
        <div className="flex flex-col gap-1">
          <If condition={teacherAndAdmin}>
            <Then>
              {activityList?.map(({ id, postingDate, description, title, isAcceptingSubmits }) => (
                <ActivitiesMaterials
                  id={id}
                  postingDate={postingDate}
                  title={title}
                  description={description}
                  isAcceptingSubmits={isAcceptingSubmits}
                  idClass={idClass}
                  idCourse={idCourse}
                  idSubject={idSubject}
                />
              ))}
            </Then>
            <Else>
              {activityList?.map(({ id, postingDate, title, isAcceptingSubmits }) => (
                <Link
                  to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities/$idActivity/view-activity-student"
                  params={{
                    idCourse,
                    idClass,
                    idSubject,
                    idActivity: id,
                  }}
                  className="w-full cursor-pointer block relative z-10"
                >
                  <div className="flex justify-between items-center border p-2 rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-yellow-400 h-10 w-10 rounded-full flex items-center justify-center">
                          <ClipboardList className="h-5 w-5 text-gray-700" color="white" />
                        </AvatarFallback>
                      </Avatar>
                      <h1 className="ml-3 font-semibold">{title}</h1>
                    </div>

                    <div className="flex items-center gap-4 font-semibold">
                      <div className="flex flex-col">
                        <p>{postingDate.toLocaleDateString()}</p>
                        <div className={`${isAcceptingSubmits ? 'text-green-700' : 'text-red-700'}`}>
                          <p>{isAcceptingSubmits ? 'Aceitando envios' : 'Recusando envios'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Else>
          </If>
        </div>
      </div>
    </>
  )
}
