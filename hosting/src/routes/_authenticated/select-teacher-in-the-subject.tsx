import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useTeachersListingQuery } from '@/queries/use-teachers-listing-query'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Route = createFileRoute('/_authenticated/select-teacher-in-the-subject')({
  component: SelectionTeacher,
})

export function SelectionTeacher() {
  const { data } = useTeachersListingQuery()

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
