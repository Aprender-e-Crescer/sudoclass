import { changePasswordRequestSchema, ChangeRequests } from "@/models/changePasswordRequestSchema"
import { firestore } from "@/services/firebase"
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs } from "firebase/firestore"

export function useChangePasswordRequestQuery() {
  return useQuery({
    queryKey: ['changed-password-requests'],
    queryFn: async () => {
      const PasswordRequestsRef = collection(firestore, 'studentPasswordChangeRequests').withConverter({
        toFirestore: (doc: ChangeRequests) => doc,
        fromFirestore: (snapshot) => changePasswordRequestSchema.parse(snapshot.data()),
      })

      const docSnap = await getDocs(PasswordRequestsRef)

      return docSnap.docs.map((doc) => doc.data())
    },
  })
}