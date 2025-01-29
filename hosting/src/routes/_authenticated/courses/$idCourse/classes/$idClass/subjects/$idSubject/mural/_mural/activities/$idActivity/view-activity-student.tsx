import { createFileRoute } from '@tanstack/react-router'
import NoteValue from '@/components/custom/note-value'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowLeft, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { useGetActivityQuery } from '@/queries/use-get-activity-query'
import { format } from 'date-fns'
import { useGetNoteByActivity } from '@/queries/use-get-note-by-activity-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'
import { useUpdateLinkActivityMutation } from '@/mutations/use-update-link-activity-mutation'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/$idActivity/view-activity-student',
)({
  component: ViewActivityStudent,
})

export function ViewActivityStudent() {
  const { idActivity } = Route.useParams()
  const { data: activity } = useGetActivityQuery(Number(idActivity))
  const currentUser = useCurrentUserQuery()
  const { data: user } = useGetUserQuery(currentUser?.data?.uid)
  const { data: notes } = useGetNoteByActivity(
    Number(idActivity),
    Number(user?.idStudent),
  )
  const [savedLink, setSavedLink] = useState<string | null>(null)

  return (
    <>
      <div className="flex flex-col md:hidden">
        <div className="flex flex-col mx-5 gap-3">
          <ArrowLeft className="mt-4 text-gray-400" />
          <p className="text-gray-500 text-xs">
            Prazo:{' '}
            {activity?.deliveryDate
              ? format(activity.deliveryDate, 'dd/MM/yyyy')
              : 'Sem prazo'}
          </p>
          <p className="text-blue-600 text-2xl font-semibold">
            {activity?.title}
          </p>
          <div className="flex text-gray-500">
            <NoteValue note={notes?.nota} maxGrade={Number(activity?.value)} />
          </div>
          <div className="w-full h-0.5 bg-gray-400"></div>
          <h1 className="text-gray-600 font-semibold text-2xl mt-9">Anexos</h1>
          <div>
            <a href={activity?.attachment || undefined}>
              <h1 className="text-blue-600 block h-6 overflow-hidden text-ellipsis">
                {activity?.attachment}
              </h1>
            </a>
          </div>

          <div className="w-full h-0.5 bg-gray-400"></div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <div className="w-full">
                <AccordionTrigger>
                  <div className="flex flex-col w-full gap-4">
                    <div className="flex justify-center items-center">
                      <ChevronUp />
                    </div>
                    <h1 className="flex text-lg font-bold text-gray-600">
                      Seus trabalhos
                    </h1>
                  </div>
                </AccordionTrigger>
              </div>
              <div className="w-full h-full">
                <AccordionContent>
                  <h1 className="text-gray-600 font-semibold text-2xl mt-9">
                    Seus Anexos
                  </h1>
                  <div>
                    {savedLink ? (
                      <a
                        href={savedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h1 className="text-blue-600 block h-6 overflow-hidden text-ellipsis">
                          {savedLink}
                        </h1>
                      </a>
                    ) : (
                      <p className="text-gray-500">Nenhum anexo adicionado.</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-5 mt-5">
                    <Button variant="lightTextBlack" className="w-full">
                      <AddWorkPopover
                        setSavedLink={setSavedLink}
                        activityId={Number(idActivity)}
                        studentId={Number(user?.idStudent)}
                      />
                    </Button>
                    <Button variant="blueButton" className="w-full">
                      Enviar
                    </Button>
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="hidden md:flex w-full">
        <div className="flex flex-col mx-5 gap-3 w-full">
          <ArrowLeft className="mt-4 text-gray-400" />
          <p className="text-blue-600 text-4xl font-semibold">
            {activity?.title}
          </p>
          <p className="text-gray-500 text-base">
            Prazo:{' '}
            {activity?.deliveryDate
              ? format(activity.deliveryDate, 'dd/MM/yyyy')
              : 'Sem prazo'}
          </p>

          <div className="flex text-gray-500">
            <NoteValue note={notes?.nota} maxGrade={Number(activity?.value)} />
          </div>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="flex flex-col gap-4">
            <h1 className="text-gray-600 font-semibold text-2xl mt-9">
              Anexos
            </h1>
            <div>
              <a href={activity?.attachment || undefined}>
                <h1 className="text-blue-600 block h-6 overflow-hidden text-ellipsis">
                  {activity?.attachment}
                </h1>
              </a>
            </div>
            <div className="w-full h-0.5 bg-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col w-1/3 border mx-10 p-5 rounded-lg">
          <h1 className="text-gray-600 font-semibold text-2xl mt-9">
            Seus Anexos
          </h1>
          <div>
            {savedLink ? (
              <a href={savedLink} target="_blank" rel="noopener noreferrer">
                <h1 className="text-blue-600 block h-6 overflow-hidden text-ellipsis">
                  {savedLink}
                </h1>
              </a>
            ) : (
              <p className="text-gray-500">Nenhum anexo adicionado.</p>
            )}
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex flex-col gap-5">
              <AddWorkPopover
                setSavedLink={setSavedLink}
                activityId={Number(idActivity)}
                studentId={Number(user?.idStudent)}
              />

              <Button variant="blueButton" className="w-full">
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function AddWorkPopover({
  setSavedLink,
  activityId,
  studentId,
}: {
  setSavedLink: React.Dispatch<React.SetStateAction<string | null>>
  activityId: number
  studentId: number
}) {
  const [tempLink, setTempLink] = useState('')
  const { mutateAsync } = useUpdateLinkActivityMutation()

  const handleSaveLink = async () => {
    try {
      await mutateAsync({
        activityId,
        studentId,
        attachment: tempLink,
      })
      setSavedLink(tempLink)
      setTempLink('')
    } catch (error) {
      console.error('Erro ao salvar link:', error)
      alert('Erro ao salvar o link.')
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="lightTextBlack" className="w-full">
          + Adicionar trabalho
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h1 className="font-medium leading-none">Insira um link abaixo</h1>
          </div>
          <div className="grid gap-2">
            <input
              type="text"
              placeholder="Digite um link"
              className="border rounded-sm w-full p-2"
              value={tempLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTempLink(e.target.value)
              }
            />
            <Button size="medium" onClick={handleSaveLink}>
              Salvar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
