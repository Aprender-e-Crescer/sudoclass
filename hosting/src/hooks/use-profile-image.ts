import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetProfileImages } from '@/queries/use-get-profile-image-query'
import { useState } from 'react'

export const useProfileImage = () => {
  const currentUser = useCurrentUserQuery()
  const userId = currentUser?.data?.uid

  const { data: profileImages, isLoading, error } = useGetProfileImages(userId)
  const avatarImage = profileImages?.[0]?.url

  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null)

  return { avatarImage, selectedImage, isLoading, error, setSelectedImage }
}
