import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog-new-collection'
import { FolderPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <button className="flex items-center gap-2 outline-none">
            <FolderPlus />
            Nova coleção
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar nova coleção</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-left">
              Nome da coleção
            </label>
            <input id="name" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none "></input>
          </div>
        </div>
        <DialogFooter className="mr-6">
          <Button variant="blueButton" size="medium">
            Confirmar
          </Button>
          <Button variant="lightTextBlack" size="medium">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
