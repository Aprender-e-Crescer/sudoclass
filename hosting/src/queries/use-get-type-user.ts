import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useGetTypeUser(uid: string) {
  return useQuery({
    queryKey: ['get-type-user', uid],
    queryFn: async () => {
      if (!uid) {
        throw new Error('UID é obrigatório para buscar o tipo de usuário.')
      }

      try {
        const { data } = await axios.get(`http://localhost:3000/alunos/${uid}`)
        return data
      } catch (error) {
        console.error('Erro ao buscar tipo de usuário:', error)
        throw error
      }
    },
    enabled: !!uid,
  })
}
