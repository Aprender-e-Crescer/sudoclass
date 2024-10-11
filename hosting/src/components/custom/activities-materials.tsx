import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'
import iconeAtividade from '@/assets/iconeAtividade.png'

export function ActivitiesMaterials() {
  return (
    <>
      <div className="w-3/5 h-32">
        <Accordion className="border rounded-3xl p-2" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center">
                <div className="flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-full">
                  <img className="h-8 w-8" src={iconeAtividade} alt="" />
                </div>
                <div className="ml-4">
                  <p className="flex color:gray font-bold text-lg text-gray-700">Titulo da atividade:</p>
                  <p className="flex color:gray text-xs text-gray-300">data da atividade</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <hr />
              <div className="ml-2 flex p-8 justify-between">
                <div className="flex gap-4">
                  <p className="text-base text-gray-700">instruções</p>
                </div>
                <div className="flex flex-col gap-y-4">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-5xl text-gray-700">0</p>
                      <p className="text-gray-700">Entregue</p>
                    </div>
                    <div className="flex items-center">
                      <div className="border-l-2 border-gray-300 h-20 mx-2"></div>
                    </div>
                    <div>
                      <p className="text-5xl text-gray-700">0</p>
                      <p className="text-gray-700">Pendentes</p>
                    </div>
                  </div>

                  <div className="flex">
                    <Switch />
                    <p className="ml-2 text-gray-700">Aceita envios</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 flex-col">
                <hr />
                <p className="text-blue-600">Visualizar Entregues</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

// use switch too for aceita envios
