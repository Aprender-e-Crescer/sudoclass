import * as Avatar from '@radix-ui/react-avatar'

interface TeacherCommentProps {
  name: string
  date: string
  comment: string
  textAvatar: string
  avatarSrc: string
}

export function TeacherComment({ name, date, comment, textAvatar, avatarSrc }: TeacherCommentProps) {
  return (
    <div className="flex">
      <div className="w-full max-w-[993px] p-4 bg-white shadow-lg rounded-lg flex gap-x-3">
        <Avatar.Root className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
          <Avatar.Image className="w-full h-full rounded-full object-cover" src={avatarSrc} alt={name} />
          <Avatar.Fallback className="text-xl text-gray-500">{textAvatar}</Avatar.Fallback>
        </Avatar.Root>

        <div className="flex flex-col sm:text-left">
          <span className="text-sm font-medium text-gray-800">{name}</span>
          <span className="text-xs text-gray-500">{date}</span>
          <p className="mt-2 text-sm text-gray-700">{comment}</p>
        </div>
      </div>
    </div>
  )
}
