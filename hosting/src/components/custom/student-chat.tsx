interface StudentChatNameProps {
  avatarImage: string
  name: string
}

export function StudentChatName({ avatarImage, name }: StudentChatNameProps) {
  return (
    <div className="flex gap-5">
      <p className="rounded-full bg-[#d9d9d9]">
        <img src={avatarImage} className="rounded-full w-16 h-16 " />
      </p>
      <div>
        <p className="text-2xl font-medium ">{name}</p>
      </div>
    </div>
  )
}
