import * as Accordion from '@radix-ui/react-accordion';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { MoreVertical, ClipboardList, Trash, Pencil } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import { useActivitiesMaterialsController } from '@/controllers/use-activity-materials-controller';


interface ActivitiesMaterialsProps {
  id: string;
  idCourse: string;
  idClass: string;
  idSubject: string;
  title: string;
  postingDate: Date;
  description: string;
  isAcceptingSubmits: boolean;
}

export default function ActivitiesMaterials({
  id,
  idCourse,
  idClass,
  idSubject,
  title,
  postingDate,
  description,
  isAcceptingSubmits,
}: ActivitiesMaterialsProps) {
  const {
    confirmDelete,
    handleDelete,
    submittedStudents,
    pendingStudents,
  } = useActivitiesMaterialsController({ id, idCourse, idClass, idSubject });

  return (
    <Accordion.Root type="single" collapsible className="w-full">
      <Accordion.Item value={id} className="border rounded-lg">
        <Accordion.Header>
          <Accordion.Trigger className="w-full py-3 px-4 text-left text-lg font-medium border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-yellow-400 h-10 w-10 rounded-full flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-gray-700" color="white" />
                  </AvatarFallback>
                </Avatar>
                <h1 className="ml-3">{title}</h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <p>{postingDate.toLocaleDateString()}</p>
                  <div className={`${isAcceptingSubmits ? 'text-green-700' : 'text-red-700'}`}>
                    <p className="font-semibold">{isAcceptingSubmits ? 'Aceitando envios' : 'Recusando envios'}</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <MoreVertical className="w-5 h-5 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md p-2">
                    <Link
                      to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities/$idActivity/update-activity"
                      params={{
                        idCourse,
                        idClass,
                        idSubject,
                        idActivity: id,
                      }}
                      className="w-full"
                    >
                      <DropdownMenuItem className="flex gap-2">
                        <Pencil className="w-4 h-4" />
                        Editar
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onSelect={handleDelete} className="flex gap-2 text-red-600">
                      <Trash className=" text-red-600 w-4 h-4" />
                      {confirmDelete ? ' Confirmar' : ' Excluir'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="p-4 bg-white">
          <div className="flex justify-between">
            <div className="mb-4">
              <h4 className="text-gray-600 font-semibold">Instruções:</h4>
              <p>{description}</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600 font-medium">Entregues</p>
                <p className="text-2xl font-bold text-green-600">{submittedStudents}</p>
              </div>

              <div className="h-10 w-px bg-gray-300"></div>

              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600 font-medium">Pendentes</p>
                <p className="text-2xl font-bold text-red-600">{pendingStudents}</p>
              </div>
            </div>
          </div>

          <div className="border-t">
            <Link
              to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities/$idActivity/correction"
              params={{
                idCourse,
                idClass,
                idSubject,
                idActivity: id,
              }}
            >
              <p className="text-blue-500 mt-2 cursor-pointer">Visualizar entregues</p>
            </Link>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}