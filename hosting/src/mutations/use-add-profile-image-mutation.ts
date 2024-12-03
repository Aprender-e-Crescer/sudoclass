import { storage } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ref, uploadBytes } from 'firebase/storage'

export const useAddProfileImage = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['addProfileImage', userId],
    mutationFn: (image: File) => {
      const profileImageRef = ref(storage, `users/${userId}/profileImage/ProfileImage.jpg`)
      return uploadBytes(profileImageRef, image)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileImages', userId] })
    },
    onError: (err) => console.log(err),
  })
}
