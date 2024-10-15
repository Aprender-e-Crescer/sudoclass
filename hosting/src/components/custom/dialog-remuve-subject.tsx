import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogRemoveSubject() {
  return (
    <>
      <Dialog>
        <DialogTrigger>Remover</DialogTrigger>
        <DialogContent className="p-4 rounded-lg w-full max-sm:p-3 max-sm:w-[290px]">
          <DialogHeader className="relative">
            <DialogTitle className="flex justify-center text-xl font-medium">
              Deseja remover a matéria
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-1 pl-5">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-orange-400"></div>
              <span className="text-xl font-semibold text-gray-700">AOO</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-blue-700"></div>
              <span className="text-xl font-semibold text-gray-700">UX/UI</span>
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <DialogClose asChild>
              <button className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition">
                Remover
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition">
                Cancelar
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
