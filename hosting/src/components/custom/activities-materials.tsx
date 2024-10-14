import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'
import iconeAtividade from '@/assets/iconeAtividade.png'
import clsx from 'clsx'

interface ActivitiesMaterialsProps {
  title: string
  dataAtv: string
  instructions: string
  iconColor: string
  assigned?: number
  pending?: number
  type: 'teacher' | 'student'
}

export function ActivitiesMaterials({
  title,
  dataAtv,
  instructions,
  iconColor,
  assigned,
  pending,
  type,
}: ActivitiesMaterialsProps) {
  if (type === 'teacher') {
    return (
      <div className="w-3/6 h-auto my-2.5">
        <Accordion className="border rounded-2xl px-4" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center">
                <div className={clsx('flex justify-center items-center ', iconColor, 'w-10 h-10 rounded-full')}>
                  <img className="h-6 w-6 " src={iconeAtividade} />
                </div>
                <div className="ml-2">
                  <p className="flex color:gray font-bold text-base text-gray-700">{title}</p>
                  <p className="flex color:gray text-xs text-gray-300">{dataAtv}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="transition-all duration-300">
              <hr className="my-2" />
              <div className="flex flex-col ml-1 md:flex justify-between  gap-5">
                <div className="hidden md:flex gap-2">
                  <p className="text-sm text-gray-700">Instruções</p>
                  <p className="text-sm mx-7">{instructions}</p>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-2">
                    <div>
                      <p className="text-3xl text-gray-700">{assigned}</p>
                      <p className="text-gray-700">Entregue</p>
                    </div>
                    <div className="flex items-center">
                      <div className="border-l-2 border-gray-300 h-10 mx-1"></div>
                    </div>
                    <div>
                      <p className="text-3xl text-gray-700">{pending}</p>
                      <p className="text-gray-700">Pendentes</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Switch />
                    <p className="ml-3 text-gray-700">Aceita envios</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-2">
                <hr className="my-2" />
                <p className="text-blue-600 text-sm">Visualizar Entregues</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  } else if (type === 'student') {
    return (
      <>
        <div className="flex items-center w-3/6 md:hidden border p-4 rounded-2xl my-2.5">
          <div className={clsx('flex justify-center items-center', iconColor, 'w-10 h-10 rounded-full')}>
            <img className="h-6 w-6" src={iconeAtividade} alt="" />
          </div>
          <div className="ml-2">
            <p className="flex color:gray font-bold text-base text-gray-700">{title}</p>
            <p className="flex color:gray text-xs text-gray-300">{dataAtv}</p>
          </div>
        </div>

        <div className="hidden md:flex md:w-3/6 h-auto my-2.5">
          <Accordion className="border rounded-2xl px-4 w-full" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center">
                  <div className={clsx('flex justify-center items-center', iconColor, 'w-10 h-10 rounded-full')}>
                    <img className="h-6 w-6" src={iconeAtividade} alt="" />
                  </div>
                  <div className="ml-2">
                    <p className="flex color:gray font-bold text-base text-gray-700">{title}</p>
                    <p className="flex color:gray text-xs text-gray-300">{dataAtv}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <div className="">
                <AccordionContent className="transition-all duration-300">
                  <hr className="my-2" />
                  <div className="flex flex-col ml-1 md:flex p-4 justify-between gap-5">
                    {/* Conteúdo visível apenas em telas maiores */}
                    <div className="hidden md:flex gap-2">
                      <p className="text-sm text-gray-700">Instruções</p>
                      <p className="text-sm mx-7">{instructions}</p>
                    </div>
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </>
    )
  }
  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-lg text-red-600">Erro de tipagem, insira student ou teacher no type</p>
    </div>
  )
}
