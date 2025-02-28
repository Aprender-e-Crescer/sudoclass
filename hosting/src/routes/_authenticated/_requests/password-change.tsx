import CardChangePassword from '@/components/custom/card-change-password'
import { ConfirmPasswordChangeDialog } from '@/components/custom/confirm-password-dialog'
import { usePasswordChangeController } from '@/controllers/password-change-controller'
import { useUpdateRequestPasswordStatus } from '@/mutations/use-update-request-password-status'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { useState } from 'react'

export const Route = createFileRoute(
  '/_authenticated/_requests/password-change',
)({
  component: PasswordChangeRequest,
  beforeLoad: async ({ context: { queryClient } }) => {
    const currentUser = await queryClient.ensureQueryData(
      currentUserQueryOptions(),
    )
    const user = (
      await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    ).data()
    if (user?.role != 'admin') throw redirect({ to: '/' })
  },
})

function PasswordChangeRequest() {
  const { profiles, refetch } = usePasswordChangeController()
  const { mutate: updateRequestStatus, isPending } = useUpdateRequestPasswordStatus()
  const [selectedPasswordRequestChangeRef, setSelectedPasswordRequestChangeRef] = useState<DocumentReference<
    DocumentData,
    DocumentData
  > | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleAccept = (
    passwordChangeRequestRef: DocumentReference<DocumentData, DocumentData>,
  ) => {
    setSelectedPasswordRequestChangeRef(passwordChangeRequestRef)
    setIsOpen(true)
  }

  const handleReject = (
    passwordChangeRequestRef: DocumentReference<DocumentData, DocumentData>,
  ) => {

    updateRequestStatus(
      { passwordChangeRequestRef, status: 'recused' },
      {
        onSuccess: () => {
          refetch()
        },
      }
    )
    setIsOpen(false)
  }

  const confirmAccept = () => {
    if (!selectedPasswordRequestChangeRef) return

    updateRequestStatus(
      { passwordChangeRequestRef: selectedPasswordRequestChangeRef, status: 'accepted' },
      {
        onSuccess: () => {
          refetch()
        },
      }
    )
    setIsOpen(false)
  }

  return (
    <div className="mt-3">
      {profiles
        .filter(({ requestStatus }) => requestStatus !== undefined)
        .map(
          ({ id, displayName, photoURL, ref, requestStatus }) => (
            <div
              key={id}
              className="flex flex-col justify-center items-center mx-20 mb-3"
            >
              <CardChangePassword
                name={displayName}
                avatarUrl={photoURL!}
                handleApproved={() => handleAccept(ref)}
                handleReject={() => handleReject(ref)}
                variant={
                  requestStatus as
                    | 'pending'
                    | 'accepted'
                    | 'recused'
                }
              />
            </div>
          ),
      )}

      <ConfirmPasswordChangeDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmAccept}
        isLoading={isPending}
      />
    </div>
  )
}
