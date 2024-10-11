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
          <AccordionContent>
            <hr />
            <div className="ml-4">
              <div className="flex">
                <Switch />
                <p className="ml-4">Aceita envios</p>
              </div>
            </div>
            <hr />
            <p className="text-blue-600">Visualizar Entregues</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

// use switch too for aceita envios
