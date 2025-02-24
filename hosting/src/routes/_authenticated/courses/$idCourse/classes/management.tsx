import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useGetFullUser } from "@/hooks/use-get-full-user"
import { getClassesQueryOptions } from "@/queries/use-get-classes-query"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { createFileRoute } from '@tanstack/react-router'
import { PenLine, Trash2 } from "lucide-react"
import { deleteDoc, DocumentReference } from "firebase/firestore"
import { getCourseQueryOptions } from "@/queries/use-get-course-by-id"

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/management',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { idCourse } = Route.useParams()
  const { role } = useGetFullUser()

  const { data: course } = useQuery(getCourseQueryOptions(idCourse))

  const { data: classes } = useQuery(getClassesQueryOptions(idCourse, role, undefined, undefined))

  const { mutate: deleteClass } = useMutation({
    mutationKey: ['deleteClass'],
    mutationFn: (ref: DocumentReference) => deleteDoc(ref),
  })

  const handleOnDeleteClassButtonClick = (ref: DocumentReference) => () => {
    deleteClass(ref)
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Turmas - {course?.name}</h1>
        <Link to="/courses/$idCourse/classes/registration" params={{ idCourse }} search={{ action: 'create' }}>
          <Button variant="blueButton" size="medium" className="py-1">
            <span className="mr-2">+</span>
            Nova turma
          </Button>
        </Link>
      </div>
      <hr />
      <div className="flex flex-col gap-y-3">
        {classes?.map(({ id, color, name, ref }) => (
          <Link key={id} to="/courses/$idCourse/classes/$idClass/management" params={{ idCourse, idClass: id }}>
            <div className="flex items-center border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="w-1.5 h-16 rounded-full mr-4" style={{ backgroundColor: color }} />
              <span className="flex-grow font-medium">{name}</span>
              <div className="flex gap-2">
                <Link to="/courses/$idCourse/classes/registration" params={{ idCourse }} search={{ action: 'edit', idClass: id }}>
                  <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                    <PenLine className="h-5 w-5 text-gray-500" />
                  </button>
                </Link>
                <Link to=".">
                  <AlertDialog>
                    <AlertDialogTrigger className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <Trash2 className="h-5 w-5 text-gray-500" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deseja excluir essa turma?</AlertDialogTitle>
                        <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleOnDeleteClassButtonClick(ref)}>
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
