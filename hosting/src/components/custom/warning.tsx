import * as Avatar from '@radix-ui/react-avatar'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useDeleteWarningMutation } from '@/mutations/use-delete-warning-mutation'

interface WarningProps {
  id: string
  date: Date
  message: string
  author?: {
    name: string
    profilePhotoSrc: string
  }
  idCourse: string
  idClass: string
  idSubject: string
}

export function Warning({ id, date, message, author, idCourse, idClass, idSubject }: WarningProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(message)
  const [isDeleted, setIsDeleted] = useState(false) 
  const authorName = author?.name ?? 'Anônimo'
  const authorProfilePhotoSrc = author?.profilePhotoSrc
  const dateFormatted = format(date, "dd/MM/yyyy 'às' HH:mm")
  const fullUser = useGetFullUser()
  const warningDeleteMutation = useDeleteWarningMutation(idCourse, idClass, idSubject)

  const handleDeleteClick = async () => {
    try {
      await warningDeleteMutation.mutateAsync(id)
      setIsDeleted(true)
    } catch (error) {
      console.error('Erro ao excluir:', error)
      
    }
  }

  if (isDeleted) {
    return null 
  }

  return (
    <div>
      <div className="w-full max-w-[993px] p-4 bg-white shadow-lg rounded-lg flex justify-between">
        <div className="flex items-center gap-x-3 w-full">
          <Avatar.Root
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${author ? 'bg-gray-100' : 'bg-yellow-300'}`}
          >
            {authorProfilePhotoSrc ? (
              <Avatar.Image className="w-full h-full rounded-full object-cover" src={authorProfilePhotoSrc} />
            ) : (
              <Avatar.Fallback className="text-xl text-gray-800 font-bold">
                {author ? authorName.charAt(0) : '?'}
              </Avatar.Fallback>
            )}
          </Avatar.Root>

          <div className="flex gap-2 flex-col sm:text-left w-full">
            <div className="flex gap-x-2 items-center">
              <span className="text-sm font-medium text-gray-800">{authorName}</span>
              <span className="text-xs text-gray-500">{dateFormatted}</span>
            </div>

            {isEditing ? (
              <div className="w-full">
                <textarea
                  className="w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-700">{editedComment}</p>
            )}
          </div>
        </div>

        {fullUser?.role === 'teacher' || fullUser?.role === 'admin' ? (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteClick}>Excluir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
      </div>
    </div>
  )
}
