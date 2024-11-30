import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { RegistrationAdmin } from '@/models/admin-registration-schema'
import { RegistrationAdminSchema } from '@/models/admin-registration-schema'

export function useAdminSchemaQuery() {
  return useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const adminsRef = collection(firestore, 'admins').withConverter({
        toFirestore: (doc: RegistrationAdmin) => doc,
        fromFirestore: (snapshot) => {
          const data = snapshot.data()

          try {
           
            return RegistrationAdminSchema.parse(data)
          } catch (error) {
            console.error('Invalid admin data', error)
            return null
          }
        },
      })

      const docSnap = await getDocs(adminsRef)
      
      return docSnap.docs.map((doc) => doc.data()).filter((data) => data !== null)
    },
  })
}
