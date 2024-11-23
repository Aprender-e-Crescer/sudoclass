import { createFileRoute } from '@tanstack/react-router'
import NoteValue from '@/components/custom/note-value'
import AttachmentView from '@/components/custom/attachment-view'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowLeft, ChevronUp, MessageSquareMore } from 'lucide-react'
import { Button } from '@/components/ui/button'
interface ViewProps {
  activityNote: string
  title: string
  dateActivity: string
}

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/activities/$idActivity/view-activity-student',
)({
  component: ViewActivityStudent,
})

export function ViewActivityStudent({
  title,
  dateActivity,
  activityNote,
}: ViewProps) {
  return (
    <>
      <div className=" flex flex-col md:hidden">
        <div className="flex flex-col mx-5 gap-3">
          <ArrowLeft className="mt-4 text-gray-400" />
          <p className="text-gray-500 text-xs">Prazo: {dateActivity}</p>
          <p className="text-blue-600 text-2xl font-semibold">{title}</p>
          <div className="flex text-gray-500">
            <NoteValue note={20} maxGrade={100} />
          </div>
          <div className="flex gap-4 items-center ">
            <MessageSquareMore className="text-gray-400" />
            <p className="font-semibold text-gray-400">
              Fazer comentário para a turma
            </p>
          </div>
          <div className=" w-full h-0.5 bg-blue-300"></div>
          <p className="text-gray-400 text-sm ">
            Clique no link abaixo para iniciar o jogo
          </p>
          <h1 className="text-gray-600 font-semibold text-2xl mt-9">Anexos</h1>
          <AttachmentView url="" imageUrl="" title="" linkText="" />

          <div className="flex justify-center items-center border-2 h-12 rounded-lg">
            <p className="text-gray-400">
              Todos os arquivos foram salvos off-line
            </p>
          </div>
          <div className=" w-full h-0.5 bg-gray-400"></div>
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
              <div className=" w-full h-full">
                <AccordionContent>
                  <div className="flex gap-4 items-center ">
                    <MessageSquareMore className="text-gray-400" />
                    <p className="font-semibold text-gray-400">
                      Fazer comentário particular
                    </p>
                  </div>
                  <h1 className="text-gray-600 font-semibold text-2xl mt-9">
                    Seus anexos
                  </h1>
                  <div className="flex flex-col w-full gap-3">
                    <AttachmentView url="" imageUrl="" title="" linkText="" />
                    <AttachmentView url="" imageUrl="" title="" linkText="" />
                  </div>

                  <div className="flex flex-col gap-5 mt-5">
                    <Button variant="lightTextBlack" className=" w-full">
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
          <p className="text-blue-600 text-4xl font-semibold">{title}</p>
          <p className="text-gray-500 text-base">Prazo: {dateActivity}</p>

          <div className="flex text-gray-500">
            <NoteValue note={20} maxGrade={100} />
          </div>
          <div className=" w-full h-0.5 bg-gray-300"></div>
          <div className="flex flex-col gap-10">
            <h1 className="text-gray-600 font-semibold text-2xl mt-9">
              Anexos
            </h1>
            <AttachmentView url="" imageUrl="" title="" linkText="" />
            <div className=" w-full h-0.5 bg-gray-300"></div>
            <p className="font-semibold text-gray-400">
              Fazer comentário para a turma
            </p>
          </div>
        </div>
        <div className="flex flex-col w-1/3 border mx-10 p-5 rounded-lg">
          <h1 className="flex text-lg font-bold text-gray-600">
            Seus trabalhos
          </h1>
          <div className="flex flex-col w-full gap-3">
            <AttachmentView url="" imageUrl="" title="" linkText="" />
            <AttachmentView url="" imageUrl="" title="" linkText="" />
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex flex-col gap-5">
              <Button variant="lightTextBlack" className=" w-full">
                + Adicionar trabalho
              </Button>
              <Button variant="blueButton" className=" w-full">
                Enviar novamente
              </Button>
            </div>

            <div className="flex gap-4 items-center mt-10 ">
              <MessageSquareMore className="text-gray-400" />
              <p className="font-semibold text-gray-400">
                Fazer comentário particular
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
