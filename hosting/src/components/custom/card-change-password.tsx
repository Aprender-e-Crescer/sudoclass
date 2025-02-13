'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Check, X } from 'lucide-react'

interface CardChangePasswordProps {
  name: string
  course?: string
  handleApproved?: () => void
  handleReject?: () => void
  avatarUrl: string
}

export default function CardChangePassword({
  name,
  course,
  handleApproved,
  handleReject,
  avatarUrl,
}: CardChangePasswordProps) {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={`${name} foto de perfil`} />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{name}</span>
          {/* <span className="text-sm text-gray-500">Curso: {course}</span> */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="p-2 flex items-center justify-center rounded-full bg-green-50">
          <button onClick={handleApproved}>
            <Check className="w-5 h-5 text-green-600" />
          </button>
        </div>
        <div className="p-2 flex items-center justify-center rounded-full bg-red-50">
          <button onClick={handleReject}>
            <X className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  )
}
