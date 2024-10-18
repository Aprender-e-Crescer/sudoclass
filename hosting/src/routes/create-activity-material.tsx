import { SubHeader } from '@/components/custom/subheader'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-activity-material')({
  component: CreateActivityMaterial,
})

export function CreateActivityMaterial() {
  return (
    <>
      <div className="flex flex-col h-full w-full justify-center items-center">
        <div className="flex w-full h-14 items-center justify-around">
          <SubHeader />
          <Button variant="blueButton" size="small">
            Reunião
          </Button>
        </div>
        <hr />
        <div className="flex justify-between w-full h-full mx-40">
          <div></div>
          <div className="flex flex-col w-2/3 h-56 border rounded-lg p-6">
            <p>Titulo</p>
            <input type="text" className="border rounded-sm" />
            <p>instruções</p>
            <input type="text" className="border p-7 rounded-sm" />
          </div>
          <div className="w-1/5 border p-5">
            <p>Titulo</p>
            <input type="text" className="border rounded-sm" />
            <p>instruções</p>
            <input type="text" className="border w-full h-2/3 rounded-sm" />
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}
