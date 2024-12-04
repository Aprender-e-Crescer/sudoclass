import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import iconeAtividade from '@/assets/iconeAtividade.png'
import clsx from 'clsx'
import { EllipsisVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link } from '@tanstack/react-router'
import { useDeleteActivityMutation } from '@/mutations/use-delete-activity-mutation'

interface ActivitiesMaterialsProps {
  id: string
  idCourse: string
  idClass: string
  idSubject: string
  toViewSends?: string
  title: string
  dateActivity?: string
  instruction: string
  iconColor?: string
  assigned?: number
  pending?: number
  type: string
}

export function ActivitiesMaterials({
  id,
  idCourse,
  idClass,
  idSubject,
  title,
  dateActivity,
  instruction,
  assigned,
  pending,
  type,
}: ActivitiesMaterialsProps) {
  const { mutateAsync: deleteActivity } = useDeleteActivityMutation()

  const handleDelete = async () => {
    try {
      await deleteActivity(Number(id))
    } catch (error) {
      console.error('Erro ao excluir atividade:', error)
    }
  }

  if (type === 'professor') {
    return (
      <div className="w-full h-auto my-2.5">
        <Accordion className="border rounded-2xl px-4 shadow-sm" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center">
                  <div className={clsx('flex justify-center items-center bg-yellow-600 w-14 h-14 rounded-full')}>
                    <img className="h-8 w-8 " src={iconeAtividade} />
                  </div>
                  <div className="ml-2">
                    <p className="flex color:gray font-bold text-lg  text-gray-700">{title}</p>
                    <p className="flex color:gray text-sm text-gray-500">{dateActivity}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleDelete}>Excluir</DropdownMenuItem>
                    <Link
                      to={`/courses/${idCourse}/classes/${idClass}/school-matrice/subjects/${idSubject}/activities/manage`} // URL formatada corretamente
                      params={{
                        idCourse,
                        idClass,
                        idSubject,
                      }}
                      search={{
                        action: 'edit',
                        idActivity: id,
                      }}
                    >
                      <DropdownMenuItem>
                        <div className="w-full h-full">Editar</div>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </AccordionTrigger>
            <AccordionContent className="transition-all duration-300">
              <hr className="my-2" />
              <div className="flex justify-between gap-5">
                <div className="hidden md:flex items-center">
                  <p className="text-lg text-gray-700">Instruções:</p>
                  <p className="text-md mx-7 text-gray-500">{instruction}</p>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-2 justify-end">
                    <div>
                      <p className="text-3xl text-gray-700">{assigned}</p>
                      <p className="text-gray-700">Entregues</p>
                    </div>
                    <div className="flex items-center">
                      <div className="border-l-2 border-gray-300 h-10 mx-1"></div>
                    </div>
                    <div>
                      <p className="text-3xl text-gray-700">{pending}</p>
                      <p className="text-gray-700">Pendentes</p>
                    </div>
                  </div>
                  <div className="flex gap-2 md:hidden"></div>
                </div>
              </div>

              <div className="flex flex-col p-2">
                <hr className="my-2" />
                <Link
                  to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/activities/$idActivity/correction"
                  params={{
                    idActivity: id,
                    idCourse,
                    idClass,
                    idSubject,
                  }}
                >
                  <p className="text-blue-600 text-md font-semibold">Visualizar Entregues</p>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  } else if (type === 'aluno' || type === 'pedagogo') {
    return (
      <>
        <div className="flex items-center w-full md:hidden border p-4 rounded-2xl my-2.5">
          <div className={clsx('flex justify-center items-center bg-yellow-600 w-10 h-10 rounded-full')}>
            <img className="h-6 w-6" src={iconeAtividade} alt="" />
          </div>
          <div className="ml-2">
            <Link
              to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/activities/$idActivity/view-activity-student"
              params={{
                idActivity: id,
                idCourse,
                idClass,
                idSubject,
              }}
            >
              <p className="flex color:gray font-bold text-lg  text-gray-700">{title}</p>
            </Link>
            <p className="flex color:gray text-sm text-gray-500">{dateActivity}</p>
          </div>
        </div>

        <div className="hidden md:flex md:w-full h-auto my-2.5">
          <Accordion className="border rounded-2xl px-4 w-full" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center">
                  <div className={clsx('flex justify-center items-center bg-blue-500 w-10 h-10 rounded-full')}>
                    <img className="h-6 w-6" src={iconeAtividade} alt="" />
                  </div>
                  <div className="ml-2">
                    <p className="flex color:gray font-bold text-lg  text-gray-700">{title}</p>
                    <p className="flex color:gray text-sm text-gray-500">{dateActivity}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <div className="">
                <AccordionContent className="transition-all duration-300">
                  <hr className="my-2" />
                  <div className="flex flex-col ml-1 md:flex p-4 justify-between gap-5">
                    <div className="hidden md:flex gap-2">
                      <p className="text-sm text-gray-700">Instruções</p>
                      <p className="text-sm mx-7">{instruction}</p>
                    </div>
                  </div>
                  <div className="flex flex-col p-2">
                    <hr className="my-2" />
                    <Link
                      to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/activities/$idActivity/view-activity-student"
                      params={{
                        idActivity: id,
                        idCourse,
                        idClass,
                        idSubject,
                      }}
                    >
                      <p className="text-blue-600 text-sm">Visualizar Atividade</p>
                    </Link>
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </>
    )
  }

  return null
}

export default ActivitiesMaterials
