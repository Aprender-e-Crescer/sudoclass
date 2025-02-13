import CardChangePassword from '@/components/custom/card-change-password'
import { usePasswordChangeController } from '@/controllers/password-change-controller'
import { getCredentialQueryOptions } from '@/queries/use-get-new-credential.query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { ConfirmPasswordChangeDialog } from '@/components/custom/confirm-password-dialog'

export const Route = createFileRoute('/_authenticated/_requests/password-change-request')({
  component: PasswordChangeRequest,
})

function PasswordChangeRequest() {
  const { profiles, updateCredentials } = usePasswordChangeController()
  const [selectedProfile, setSelectedProfile] = useState<DocumentReference<DocumentData, DocumentData> | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { data: password, isLoading } = useQuery({
    ...getCredentialQueryOptions(selectedProfile!),
    enabled: !!selectedProfile,
  })

  const handleAccept = (profileRef: DocumentReference<DocumentData, DocumentData>) => {
    setSelectedProfile(profileRef)
    setIsOpen(true)
  }

  const confirmAccept = () => {
    if (!selectedProfile || !password) return
    updateCredentials({ profileRef: selectedProfile, password: password })
    setIsOpen(false)
  }

  return (
    <div className="mt-3">
      {profiles.map(({ id, displayName, photoURL, profileRef }) => (
        <div key={id} className="flex flex-col justify-center items-center mx-20 mb-3">
          <CardChangePassword
            name={displayName}
            avatarUrl={photoURL!}
            handleApproved={() => handleAccept(profileRef)}
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
