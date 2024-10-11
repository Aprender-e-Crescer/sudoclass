import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'
import iconeAtividade from '@/assets/iconeAtividade.png'

export function ActivitiesMaterials() {
  return (
    <>
      <Accordion className="border rounded-3xl p-4 " type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="">
            <div className="flex items-center">
              <div className="flex justify-center items-center bg-yellow-500 w-20 h-20 rounded-full">
                <img className="h-12 w-12 " src={iconeAtividade} alt="" />
              </div>
              <div className="ml-5">
                <p className="flex color:gray ml-0 font-bold text-2xl text-gray-700">Titulo da atividade:</p>
                <p className="flex color:gray ml-0 text-gray-300">data da atividade</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="">
            <hr />
            <div className="ml-4 flex p-16 justify-between">
              <div className="flex gap-5">
                <p className="text-lg text-gray-700">instruções</p>
              </div>
              <div className="flex flex-col gap-y-5">
                <div className="flex gap-5">
                  <div>
                    <p className="text-6xl text-gray-700">0</p>
                    <p className="text-gray-700">Entregue</p>
                  </div>
                  <div className="flex items-center">
                    <div className="border-l-2 border-gray-300 h-24 mx-4"></div>
                  </div>
                  <div>
                    <p className="text-6xl text-gray-700">0</p>
                    <p className="text-gray-700">Pendentes</p>
                  </div>
                </div>

                <div className="flex">
                  <Switch />
                  <p className="ml-4 text-gray-700">Aceita envios</p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 flex-col">
              <hr />
              <p className="text-blue-600">Visualizar Entregues</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

// use switch too for aceita envios
