import { createFileRoute } from '@tanstack/react-router'
import NoteValue from '@/components/custom/note-value'
import AttachmentView from '@/components/custom/attachment-view'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowLeft, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ModalUpload from '@/components/custom/modal-upload'
import { useGetActivityQuery } from '@/queries/use-get-activity-query'
import { format } from 'date-fns'
import { useGetNoteByActivity } from '@/queries/use-get-note-by-activity-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/activities/$idActivity/view-activity-student',
)({
  component: ViewActivityStudent,
})

export function ViewActivityStudent() {
  const [openModal, setOpoenModal] = useState<boolean>(false)
  const { idActivity } = Route.useParams()
  const { data: activity } = useGetActivityQuery(Number(idActivity))
  const currentUser = useCurrentUserQuery()
  const { data: user } = useGetUserQuery(currentUser?.data?.uid)
  const { data: notes, isError, isSuccess } = useGetNoteByActivity(Number(idActivity), Number(user?.idStudent))

  return (
    <>
      <ModalUpload hasInput={false} onOpenChange={setOpoenModal} open={openModal} />

      <div className=" flex flex-col md:hidden">
        <div className="flex flex-col mx-5 gap-3">
          <ArrowLeft className="mt-4 text-gray-400" />
          <p className="text-gray-500 text-xs">
            Prazo: {activity?.deliveryDate ? format(activity.deliveryDate, 'dd/MM/yyyy') : 'Sem prazo'}
          </p>
          <p className="text-blue-600 text-2xl font-semibold">{activity?.title}</p>
          <div className="flex text-gray-500">
            <NoteValue note={0} maxGrade={Number(activity?.value)} />
          </div>
          <div className=" w-full h-0.5 bg-gray-400"></div>
          <h1 className="text-gray-600 font-semibold text-2xl mt-9">Anexos{activity?.attachment}</h1>
          <AttachmentView url="" imageUrl="" title="" linkText="" />

          <div className=" w-full h-0.5 bg-gray-400"></div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <div className="w-full">
                <AccordionTrigger>
                  <div className="flex flex-col w-full gap-4">
                    <div className="flex justify-center items-center">
                      <ChevronUp />
                    </div>
                    <h1 className="flex text-lg font-bold text-gray-600">Seus trabalhos</h1>
                  </div>
                </AccordionTrigger>
              </div>
              <div className=" w-full h-full">
                <AccordionContent>
                  <h1 className="text-gray-600 font-semibold text-2xl mt-9">Seus anexos</h1>
                  <div className="flex flex-col w-full gap-3">
                    <AttachmentView url="" imageUrl="" title="" linkText="" />
                  </div>

                  <div className="flex flex-col gap-5 mt-5">
                    <Button variant="lightTextBlack" className="w-full" onClick={() => setOpoenModal(true)}>
                      + Adicionar trabalho
                    </Button>
                    <Button variant="blueButton" className=" w-full">
                      Enviar novamente
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
          <p className="text-blue-600 text-4xl font-semibold">{activity?.title}</p>
          <p className="text-gray-500 text-base">
            Prazo: {activity?.deliveryDate ? format(activity.deliveryDate, 'dd/MM/yyyy') : 'Sem prazo'}
          </p>

          <div className="flex text-gray-500">
            <NoteValue note={notes?.nota} maxGrade={Number(activity?.value)} />
          </div>
          <div className=" w-full h-0.5 bg-gray-300"></div>
          <div className="flex flex-col gap-10">
            <h1 className="text-gray-600 font-semibold text-2xl mt-9">Anexos</h1>
            <div className=" w-full h-0.5 bg-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col w-1/3 border mx-10 p-5 rounded-lg">
          <h1 className="flex text-lg font-bold text-gray-600">Seus trabalhos</h1>
          <div className="flex flex-col w-full gap-3">
            <AttachmentView url="" imageUrl="" title="" linkText="" />
            <AttachmentView url="" imageUrl="" title="" linkText="" />
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex flex-col gap-5">
              <Button variant="lightTextBlack" className="w-full" onClick={() => setOpoenModal(true)}>
                + Adicionar trabalho
              </Button>
              <Button variant="blueButton" className=" w-full">
                Enviar novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
