import { Button } from '@/components/ui/button'
import { ActivitiesMaterials } from '@/components/custom/activities-materials'
import { FaPlus } from 'react-icons/fa'
import { createFileRoute } from '@tanstack/react-router'

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

const activitiesData = [
  {
    id: '1',
    link: `/atividade/1`,
    title: `Professor atribuiu uma nova atividade:`,
    dateActivity: `2024-10-18`,
    instructions: `Complete a atividade de AOO`,
    iconColor: 'bg-yellow-500',
    assigned: Math.floor(Math.random() * 10) + 1,
    pending: Math.floor(Math.random() * 5),
    type: 'teacher',
  },
  {
    id: '2',
    link: `/atividade/2`,
    title: `Professor atribuiu uma nova atividade:`,
    dateActivity: `2024-10-18`,
    instructions: `Complete a atividade de BANCO DE DADOS`,
    iconColor: 'bg-yellow-500',
    assigned: Math.floor(Math.random() * 10) + 1,
    pending: Math.floor(Math.random() * 5),
    type: 'teacher',
  },
  {
    id: '3',
    link: `/atividade/3`,
    title: `Professor atribuiu uma nova atividade:`,
    dateActivity: `2024-10-18`,
    instructions: `Complete a atividade de WEB1`,
    iconColor: 'bg-yellow-500',
    assigned: Math.floor(Math.random() * 10) + 1,
    pending: Math.floor(Math.random() * 5),
    type: 'teacher',
  },
  {
    id: '4',
    link: `/atividade/4`,
    title: `Professor atribuiu uma nova atividade:`,
    dateActivity: `2024-10-18`,
    instructions: `Complete a atividade de WEB2`,
    iconColor: 'bg-yellow-500',
    assigned: Math.floor(Math.random() * 10) + 1,
    pending: Math.floor(Math.random() * 5),
    type: 'teacher',
  },
  {
    id: '5',
    link: `/atividade/5`,
    title: `Professor atribuiu uma nova atividade:`,
    dateActivity: `2024-10-18`,
    instructions: `Complete a atividade de UX/UI`,
    iconColor: 'bg-yellow-500',
    assigned: Math.floor(Math.random() * 10) + 1,
    pending: Math.floor(Math.random() * 5),
    type: 'teacher',
  },
]

export const Route = createFileRoute('/list-activity')({
  component: ListActivity,
})

export function ListActivity() {
  return (
    <>
      <div className="min-h-screen overflow-y-hidden">
        <div className="flex flex-col md:flex-row overflow-hidden">
          <div className="hidden md:block border-r border-gray-300 min-h-full"></div>

          <div className="flex flex-col w-full h-auto p-2 md:p-4 overflow-hidden">
            <div className="border-t -ml-4 border-gray-300 my-2 relative -mr-10"></div>

            <div>
              <Button
                className="bg-blue-600 mt-3 mb-3 ml-[228px] text-sm rounded-s-full rounded-e-full"
                iconPosition="left"
                icon={<FaPlus />}
                variant="blueButton"
                size="small"
              >
                Criar
              </Button>
            </div>

            <div className="md:ml-5">
              <div>
                {activitiesData.map((activity) => {
                  const validType =
                    activity.type === 'teacher' || activity.type === 'student' ? activity.type : 'teacher'

                  return (
                    <div className="flex flex-col justify-center items-center w-full" key={activity.id}>
                      <ActivitiesMaterials
                        id={activity.id}
                        to={activity.link}
                        title={activity.title}
                        dateActivity={activity.dateActivity}
                        instructions={activity.instructions}
                        iconColor={activity.iconColor}
                        assigned={activity.assigned}
                        pending={activity.pending}
                        type={validType}
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
