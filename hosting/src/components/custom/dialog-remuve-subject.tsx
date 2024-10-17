import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Subject {
  name: string;
  color: string;
}

interface Props {
  subjects: Subject[];
}

export function DialogRemoveSubject({ subjects }: Props) {
  return (
    <Dialog>
      <DialogTrigger>Remover</DialogTrigger>
      <DialogContent className="p-4 rounded-lg w-full max-sm:p-3 max-sm:w-[290px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-xl font-medium">
            Deseja remover a matéria?
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 space-y-1 pl-5">
          {subjects && subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full"
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
            <Button variant="blueButton" className="flex-1 px-4 py-2 font-medium w-full">
              Remover
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="lightTextBlack" className="flex-1 px-4 py-2 font-medium w-full">
              Cancelar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
