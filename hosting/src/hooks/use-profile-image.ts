import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetProfileImages } from '@/queries/use-get-profile-image-query'
import { useEffect, useState } from 'react'

export const useProfileImage = () => {
  const currentUser = useCurrentUserQuery()
  const userId = currentUser?.data?.uid

  const { data: profileImages, isLoading, error } = useGetProfileImages(userId)

  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null)

  useEffect(() => {
    if (profileImages && profileImages.length > 0) {
      setSelectedImage(profileImages[0]?.url || null)
    }
  }, [profileImages])

  return { selectedImage, isLoading, error, setSelectedImage }
}
