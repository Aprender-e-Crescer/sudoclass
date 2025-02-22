import CardChangePassword from '@/components/custom/card-change-password'
import { usePasswordChangeController } from '@/controllers/password-change-controller'
import { getCredentialQueryOptions } from '@/queries/use-get-new-credential.query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { ConfirmPasswordChangeDialog } from '@/components/custom/confirm-password-dialog'
import { useUpdateRequestPasswordStatus } from '@/mutations/use-update-request-password-status'

export const Route = createFileRoute('/_authenticated/_requests/password-change-request')({
  component: PasswordChangeRequest,
})

function PasswordChangeRequest() {
  const { profiles, updateCredentials } = usePasswordChangeController()
  const { mutate: updateRequestStatus } = useUpdateRequestPasswordStatus()
  const [selectedProfile, setSelectedProfile] = useState<DocumentReference<DocumentData, DocumentData> | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [statusMap, setStatusMap] = useState<Record<string, string>>({})

  const { data: password, isLoading } = useQuery({
    ...getCredentialQueryOptions(selectedProfile!),
    enabled: !!selectedProfile,
  })

  const handleAccept = (profileRef: DocumentReference<DocumentData, DocumentData>) => {
    setSelectedProfile(profileRef)
    setIsOpen(true)
  }

  const handleReject = (profileRef: DocumentReference<DocumentData, DocumentData>, id: string) => {
    updateRequestStatus(
      { profileRef: profileRef, status: 'recused' },
      {
        onSuccess: () => {
          setStatusMap((prev) => ({ ...prev, [id]: 'recused' }))
        },
      },
    )
    setIsOpen(false)
    setSelectedProfile(null)
  }

  const confirmAccept = () => {
    if (!selectedProfile || !password) return

    updateCredentials({ profileRef: selectedProfile, password: password })
    updateRequestStatus(
      { profileRef: selectedProfile, status: 'accepted' },
      {
        onSuccess: () => {
          setStatusMap((prev) => ({ ...prev, [selectedProfile.id]: 'accepted' }))
        },
      },
    )
    setIsOpen(false)
  }

  return (
    <div className="mt-3">
      {profiles.map(({ id, displayName, photoURL, profileRef, requestStatus }) => (
        <div key={id} className="flex flex-col justify-center items-center mx-20 mb-3">
          <CardChangePassword
            name={displayName}
            avatarUrl={photoURL!}
            handleApproved={() => handleAccept(profileRef)}
            handleReject={() => handleReject(profileRef, id)}
            variant={(statusMap[id] || requestStatus) as 'pending' | 'accepted' | 'recused'}
          />
        </div>
      ))}

      <ConfirmPasswordChangeDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmAccept}
        isLoading={isLoading}
        password={password}
      />
    </div>
  )
}
