import * as Avatar from '@radix-ui/react-avatar'
import { EllipsisVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { When } from 'react-if'
import { useWarningComponentController } from '@/controllers/use-warning-component-controller'

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

export function Warning(props: WarningProps) {
  const {
    isEditing,
    editedComment,
    setEditedComment,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
    isDeleted,
    authorName,
    authorProfilePhotoSrc,
    dateFormatted,
    hasPermissionToSendWarning,
  } = useWarningComponentController(props)

  if (isDeleted) return null

  return (
    <div className="w-full px-4 py-4 bg-white shadow-lg rounded-lg flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Avatar.Root className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {authorProfilePhotoSrc ? (
              <Avatar.Image className="w-full h-full rounded-full object-cover" src={authorProfilePhotoSrc} />
            ) : (
              <Avatar.Fallback className="text-sm text-gray-800 font-bold">
                {authorName.charAt(0) || '?'}
              </Avatar.Fallback>
            )}
          </Avatar.Root>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800">{authorName}</span>
            <span className="text-xs text-gray-500">{dateFormatted}</span>
          </div>
        </div>

        <When condition={hasPermissionToSendWarning}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="cursor-pointer text-gray-500 hover:text-gray-700" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleEditClick}>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteClick}>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </When>
      </div>

      <div className="mt-2 w-full">
        {isEditing ? (
          <div className="w-full">
            <textarea
              className="w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md" onClick={handleSaveClick}>
                Salvar
              </button>
              <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md" onClick={handleCancelClick}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-1 text-sm text-gray-700 break-words whitespace-pre-wrap w-full">
            {editedComment}
          </p>
        )}
      </div>
    </div>
  )
}
