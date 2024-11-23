import { Button } from '@/components/ui/button'
import { ActivitiesMaterials } from '@/components/custom/activities-materials'
import { createFileRoute } from '@tanstack/react-router'
import { useListActivitiesQuery } from '@/queries/use-list-activities-query'
import { Plus } from 'lucide-react'

interface ListActivity {
  id: string
  link: string
  title: string
  dateActivity: string
  instructions: string
  iconColor: string
  assigned: number
  pending: number
  type: 'teacher' | 'student'
}

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/activities/',
)({
  component: ListActivity,
})

export function ListActivity() {
  const { data: activities } = useListActivitiesQuery('aQjvxCKlEuHc9YQEedCQ', 'zGTOAwnKJBjFSmayHxJo')
  const {
    idClass,
    idCourse,
    idSubject,
  } = Route.useParams()

  return (
    <>
      <div className="min-h-screen overflow-y-hidden w-full">
        <div className="flex flex-col md:flex-row overflow-hidden">
          <div className="flex flex-col w-full h-auto p-2 md:p-4 overflow-hidden">
            <div className="border-t -ml-4 border-gray-300 my-2 relative -mr-10"></div>
            <div>
              <Button
                className="md:ml-5 bg-blue-600 mt-5  mb-3 text-sm rounded-s-full rounded-e-full"
                iconPosition="left"
                icon={<Plus />}
                variant="blueButton"
                size="small"
              >
                Criar
              </Button>
            </div>
            <div className="md:ml-5">
              <div>
                {activities?.map((activity) => {
                  return (
                    <div className="flex flex-col justify-center items-center w-full" key={activity.id}>
                      <ActivitiesMaterials
                        id={activity.id}
                        idClass={idClass}
                        idCourse={idCourse}
                        idSubject={idSubject}
                        title={activity.title}
                        instruction={activity.instruction}
                        type="teacher"
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
