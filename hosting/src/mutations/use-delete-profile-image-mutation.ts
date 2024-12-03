import { storage } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteObject, ref } from 'firebase/storage'

export const useDeleteProfileImage = (userId: string | undefined) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteProfileImage', userId],
    mutationFn: async (profileImageReference: string | ArrayBuffer | null) => {
      const imageRef = ref(storage, profileImageReference)
      return deleteObject(imageRef)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileImages', userId] })
    },
  })
}
