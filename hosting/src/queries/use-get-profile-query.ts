import { profileSchema } from '@/models/profile-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export function useGetProfileQuery(cpf: string) {
  return useQuery({
    queryKey: ['get-profile', cpf],
    queryFn: async () => {
      const userRef = doc(firestore, 'users', cpf)
      const userSnapshot = await getDoc(userRef)

      if (!userSnapshot.exists()) {
        throw new Error('Usuário não encontrado')
      }

      const userData = userSnapshot.data()
      const profileRef = userData?.profileRef

      if (!profileRef) {
        throw new Error('Referência de perfil não encontrada')
      }

      const profileSnapshot = await getDoc(profileRef)
      if (!profileSnapshot.exists()) {
        throw new Error('Perfil não encontrado')
      }

      return profileSchema.parse({ id: profileSnapshot.id, ...profileSnapshot.data() })
    },
  })
}
