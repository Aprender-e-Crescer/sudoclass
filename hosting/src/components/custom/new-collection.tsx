import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog-new-collection'
import { FolderPlus } from 'lucide-react'

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button variant="outline" className="flex items-center gap-2 border-none">
            <FolderPlus />
            Nova coleção
          </Button>
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
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
