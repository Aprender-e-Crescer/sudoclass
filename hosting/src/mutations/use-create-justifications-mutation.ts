import { api } from '@/services/api'
import { storage } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export function useCreateJustificationMutation(userId: number | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createJustification', userId],
    mutationFn: async ({
      id_chamada,
      justificativa,
      image,
    }: {
      id_chamada: number | null
      justificativa: string
      image: File
    }) => {
      const requestBody = {
        id_chamada,
        justificativa,
      }

      const { data } = await api.post('/justificativa', requestBody)
      console.log('Resposta da API:', data)

      const justificationId = data.id

      console.log(justificationId)

      const justificationFolderRef = ref(storage, `users/${userId}/justifications/${justificationId}`)

      const justificationImageRef = ref(justificationFolderRef, image.name)
      const uploadResult = await uploadBytes(justificationImageRef, image)

      const imageUrl = await getDownloadURL(uploadResult.ref)

      const updateRequestBody = {
        id_chamada,
        justificativa,
        image_url: imageUrl,
      }

      console.log(updateRequestBody)

      await api.put(`/justificativa/${justificationId}`, updateRequestBody)

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['justifications'] })
    },
    onError: (error) => {
      console.error('Erro ao criar justificativa:', error)
    },
  })
}
