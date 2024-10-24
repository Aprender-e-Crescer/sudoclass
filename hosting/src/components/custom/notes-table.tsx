import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Avatarimg from '@/assets/avatar.png'

interface Props {
  name?: string
  rating?: string
  overallRating?: string
  otherNotes?: string
  avatar?: string
}

export function NotesTable({ name, rating, overallRating, avatar, otherNotes }: Props) {
  return (
    <>
      <div className="flex flex-row md:hidden">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center border border-[#DBDBDB] w-24 p-4 h-20">
            {avatar && (
              <Avatar className="w-28">
                <AvatarImage src={avatar || Avatarimg} alt={name} />
                <AvatarFallback />
              </Avatar>
            )}
            
          </div>

          <div className="flex items-center justify-center border border-[#DBDBDB] w-24 h-20 text-[#292D32] text-opacity-70">
            {rating}
          </div>

          <div className="flex items-center justify-center border border-[#DBDBDB] w-24 h-20 text-[#292D32] text-opacity-70">
            {overallRating}
          </div>

          <div className="flex items-center justify-center border border-[#DBDBDB] w-24  h-20">{otherNotes}</div>
        </div>
      </div>

      <div className="hidden md:flex">
        <div className="flex">
          <div className="flex items-center border border-[#DBDBDB] gap-12 w-72">
            <div className="flex flex-col">
              {' '}
              {avatar && (
                <Avatar>
                  <AvatarImage src={avatar || Avatarimg} alt={name} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex justify-center items-center">{name}</div>
          </div>
          <div className="flex items-center justify-center border border-[#DBDBDB] w-52 h-24 text-[#292D32] text-opacity-70">
            {rating}
          </div>
          <div className="flex items-center justify-center border border-[#DBDBDB] w-52 h-24 text-[#292D32] text-opacity-70">
            {overallRating}
          </div>
          <div className="flex items-center justify-center border border-[#DBDBDB] w-52 h-24">{otherNotes}</div>
          <div className="flex items-center justify-center border border-[#DBDBDB] w-52 h-24">{otherNotes}</div>
        </div>
      </div>
    </>
  )
}