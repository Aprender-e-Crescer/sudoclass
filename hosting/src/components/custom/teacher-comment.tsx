import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'

export function TeacherComment() {
  return (
    <div>
      <div className="w-[993px] h-[83px] mx-auto p-4 bg-white shadow-lg rounded-lg flex space-x-4">
        <Avatar.Root className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
          <Avatar.Image
            className="w-full h-full rounded-full object-cover"
            src=".../assets/teachercommentavatarphoto.png"
            alt="Alexandre Martinek"
          />
          <Avatar.Fallback className="text-xl text-gray-500">AM</Avatar.Fallback>
        </Avatar.Root>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-gray-800">Alexandre Martinek</span>
          <span className="text-xs text-gray-500">Ontem</span>
          <p className="mt-2 text-sm text-gray-700">Prova amanhã pessoal! Não faltem</p>
        </div>
      </div>
    </div>
  )
}
