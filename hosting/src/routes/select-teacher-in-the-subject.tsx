import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/select-teacher-in-the-subject')({
  component: SelectionTeacher,
})

export function SelectionTeacher() {
  return (
    <div>
      <h1 className="font-semibold p-5 border">Selecione professor</h1>
      <h1 className="font-semibold p-3 ml-3 text-gray-400">Professores cadastrados</h1>
      <hr />
      <div className="flex items-center ml-6 p-4 ">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white">A</div>
        <p className="text-gray-700 ml-4">Alexandre</p>
      </div>
      <hr />
      <div className="flex items-center ml-6 p-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500 text-white">P</div>
        <p className="text-gray-700 ml-4">Pardim</p>
      </div>
      <hr />
      <div className="flex items-center ml-6 p-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-400 text-white">S</div>
        <p className="text-gray-700 ml-4">Stephani</p>
      </div>
      <hr />
      <div className="flex items-center ml-6 p-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-500 text-white">J</div>
        <p className="text-gray-700 ml-4">José Otavio</p>
      </div>
      <div className="flex items-center justify-center mt-5">
        <Button variant="lightTextBlack">Cancelar</Button>
        <Button variant="blueButton">Adicionar</Button>
      </div>
    </div>
  )
}
