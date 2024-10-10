import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'

export function ActivitiesMaterials() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex">
              <div className="bg-yellow-500 w-20 h-20"></div>
              <div>
                <h1 className="color:gray ml-0">Material 1</h1>
                <p className="color:gray ml-0">Material de exemplo para atividade 1.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-4">
              <hr />
              <div className="flex">
                <Switch />
                <p className="ml-4">Aceita envios</p>
              </div>
              <hr />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

// use switch too for aceita envios
