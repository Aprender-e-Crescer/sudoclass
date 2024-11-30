import { useState } from 'react'
import { EllipsisVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface commentProps {
  id_comentario: number
  sendBy: string
  mensagem: string
}

export function CommentActivity({ id_comentario, sendBy, mensagem }: commentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(mensagem)
  const [isHidden, setIsHidden] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setIsEditing(false)
    setEditedComment(editedComment) // Atualiza o comentário com o valor editado
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setEditedComment(mensagem) // Restaura o comentário original
  }

  const handleDeleteClick = () => {
    setIsHidden(true) // Marca o comentário como excluído
  }

  if (isHidden) {
    return null
  }

  return (
    <div className="w-full border p-4 bg-white shadow-md rounded-lg flex justify-between">
      <div className="flex flex-col sm:text-left">
        <span className="text-sm font-medium text-gray-800">{sendBy}</span>

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
  )
}
