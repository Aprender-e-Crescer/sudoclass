import * as Avatar from '@radix-ui/react-avatar'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useUpdateWarningMutation } from '@/mutations/use-update-warning-mutation'

interface WarningProps {
  id: number
  name: string
  date: string
  comment: string
  textAvatar?: string
  avatarSrc: string
}

export function Warning({ id, name, date, comment, textAvatar, avatarSrc }: WarningProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(comment)
  const [isHidden, setIsHidden] = useState(false)

  const updateWarningMutation = useUpdateWarningMutation()

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    console.log(editedComment)
    updateWarningMutation.mutate(
      { warningId: Number(id), message: editedComment },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
        onError: (error) => {
          console.error('Erro ao atualizar o aviso:', error)
        },
      },
    )
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setEditedComment(comment)
  }

  const handleDeleteClick = () => {
    setIsHidden(true)
  }

  if (isHidden) {
    return null
  }

  return (
    <div>
      <div className="w-full max-w-[993px] p-4 bg-white shadow-lg rounded-lg flex justify-between">
        <div className="flex items-center gap-x-3">
          <Avatar.Root className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <Avatar.Image className="w-full h-full rounded-full object-cover" src={avatarSrc} alt={name} />
            <Avatar.Fallback className="text-xl text-gray-500">{textAvatar}</Avatar.Fallback>
          </Avatar.Root>

          <div className="flex flex-col sm:text-left">
            <span className="text-sm font-medium text-gray-800">{name}</span>
            <span className="text-xs text-gray-500">{date}</span>
            {isEditing ? (
              <div>
                <textarea
                  className="mt-2 text-sm text-gray-700 w-full border border-gray-300 p-2 rounded-md"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSaveClick}>
                    Salvar
                  </button>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={handleCancelClick}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-700">{editedComment}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleEditClick}>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteClick}>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
