import sudotecLogo from '@/assets/sudotecLogo.svg'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface headerProps {
    avatarFallBack: string
    avatarImage: string
}
export function Header ({ avatarImage, avatarFallBack}: headerProps) {
    return(
        <div className='flex justify-between items-center border p-4'>
            <div className='flex h-24 w-40'>
                <img src= {sudotecLogo} alt="sudotecLogo" />
            </div>
            <div className='flex h-11 w-11'>
            <Avatar>
                <img src={avatarImage} />
                <AvatarFallback>{avatarFallBack}</AvatarFallback>
            </Avatar>

            </div>
        </div>
        
    )   

}