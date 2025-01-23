import { storage } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { getDownloadURL, listAll, ref } from 'firebase/storage'

export const USE_GET_PROFILE_IMAGES_QUERY = ['profileImages']

export const useGetProfileImages = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['profileImages', userId],
    queryFn: () => {
      const profileImageRef = ref(storage, `users/${userId}/profileImage`)
      return listAll(profileImageRef).then(({ items }) =>
        Promise.all(
          items.map((imageRef) =>
            getDownloadURL(imageRef).then((url) => ({
              url,
              ref: imageRef,
            })),
          ),
        )
      )
    },
    enabled: !!userId,
  })
}
