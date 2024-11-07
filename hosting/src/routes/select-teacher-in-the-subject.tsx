import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
<<<<<<< HEAD
import { useTeachersSchemaQuery } from '@/queries/use-teachers-listing-query'
=======
import { TeachersSchemaQuery } from '@/queries/use-teachers-listing-query'
>>>>>>> f724c18c13d176eafacf0d6e256ae282de8e7978
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Route = createFileRoute('/select-teacher-in-the-subject')({
  component: SelectionTeacher,
})

export function SelectionTeacher() {
  const { data } = useTeachersSchemaQuery()

  return (
    <div>
      <h1 className="font-semibold p-4 border">Selecione professor</h1>
      <h1 className="font-semibold p-3 ml-3 text-gray-400">Professores cadastrados</h1>
      <hr />
      {data?.map(({ fullName, profilePhoto }) => {
        return (
          <div className="hover:bg-blue-50">
            <div className="flex items-center ml-6 p-4">
              <Avatar>
                <AvatarImage src={`data:image/jpeg;base64,${profilePhoto}`} />
                <AvatarFallback>{fullName[0].toString().toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-gray-700 ml-4">{fullName}</p>
            </div>
            <hr />
          </div>
        )
      })}

      <div className="flex items-center justify-center mt-5">
        <Button variant="lightTextBlack">Cancelar</Button>
        <Button variant="blueButton">Adicionar</Button>
      </div>
    </div>
  )
}
