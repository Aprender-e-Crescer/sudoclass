import { useState } from 'react'
import { format } from 'date-fns'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useDeleteWarningMutation } from '@/mutations/use-delete-warning-mutation'
import { useUpdateWarningMutation } from '@/mutations/use-update-warning-mutation'

interface DTO {
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

export function useWarningComponentController({ id, date, message, author, idCourse, idClass, idSubject }: DTO) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(message)
  const [previousMessage, setPreviousMessage] = useState(message)
  const [isDeleted, setIsDeleted] = useState(false)
  const authorName = author?.name ?? 'Anônimo'
  const authorProfilePhotoSrc = author?.profilePhotoSrc
  const dateFormatted = format(date, "dd/MM/yyyy 'às' HH:mm")
  const fullUser = useGetFullUser()
  const warningDeleteMutation = useDeleteWarningMutation(idCourse, idClass, idSubject)
  const warningUpdateMutation = useUpdateWarningMutation()

  const hasPermissionToSendWarning = fullUser?.role === 'teacher' || fullUser?.role === 'admin'

  const handleDeleteClick = async () => {
    try {
      await warningDeleteMutation.mutateAsync(id)
      setIsDeleted(true)
    } catch (error) {
      console.error('Erro ao excluir:', error)
    }
  }

  const handleEditClick = () => {
    setPreviousMessage(editedComment)
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    try {
      await warningUpdateMutation.mutateAsync({
        id,
        idCourse,
        idClass,
        idSubject,
        message: editedComment,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao atualizar:', error)
    }
  }

  const handleCancelClick = () => {
    setEditedComment(previousMessage)
    setIsEditing(false)
  }

  return {
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
  }
}
