import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { collection, DocumentReference, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { z } from 'zod'

export const Route = createFileRoute('/password-changes')({
  component: ChangedPasswordRequests,
})

const changePasswordRequestSchema = z.object({
  newPasswordDefault: z.string(),
  requestStatus: z.string(),
  studentName: z.instanceof(DocumentReference),
})

type ChangeRequests = z.infer<typeof changePasswordRequestSchema>

export function ChangedPasswordRequests() {
  const { data: changeRequests } = useQuery({
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

  return (
    <>
      <div>
        {changeRequests?.map(({ newPasswordDefault, requestStatus }, index) => (
          <div key={index}>
            <p>
              Nova senha padrão {newPasswordDefault}, status da solicitação: {requestStatus}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
