import { CustomLoading } from '@/components/custom/custom-loading'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getActivitiesQueryOptions } from '@/queries/use-list-activities-query'
import ActivitiesMaterials from '@/components/custom/activities-materials'
import { PlusIcon } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/',
)({
  component: ListActivity,
})

export function ListActivity() {
  const { idClass, idCourse, idSubject } = Route.useParams()

  // const activitiesQueryOptions = getActivitiesQueryOptions(idCourse, idClass, idSubject)
  // useFirestoreRealtimeQuery(activitiesQueryOptions.queryKey, getActivitiesFirestoreQuery(idCourse, idClass, idSubject))

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
        </div>
        <div className="flex flex-col gap-1">
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
        </div>
      </div>
    </>
  )
}
