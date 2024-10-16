import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Subject {
  name: string;
  color: string;
}

interface Props {
  subjects: Subject[]
}

export function DialogRemoveSubject({ subjects }: Props) {
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
            {subjects && subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full bg-"
                    style={{ backgroundColor: subject.color }}
                  ></div>
                  <span className="text-xl font-semibold text-gray-700">
                    {subject.name}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhuma matéria disponível.</p>
            )}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <DialogClose asChild>
              <button className="flex-1 px-4 py-2 bg-[#e6e9eb] text-black font-medium rounded-md hover:bg-[#d8dbdd] transition">
                Remover
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button className="flex-1 px-4 py-2 bg-[#1A73E8] text-white font-medium rounded-md hover:bg-blue-700 transition">
                Cancelar
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
