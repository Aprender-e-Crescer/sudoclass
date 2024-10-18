

import sudotecLogo from '@/assets/sudotecLogo.svg'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface headerProps {
    avatarFallBack: string
    avatarImage: string
}
export function Header ({ avatarImage, avatarFallBack}: headerProps) {
    return(
        <div className='flex justify-between items-center border px-16 py-4'>
            <div className='flex h-20 w-36'>
                <img src= {sudotecLogo} alt="sudotecLogo" />
            </div>
            <div className='flex '>
            <Avatar className='flex h-12 w-12'>
                <img src={avatarImage} />
                <AvatarFallback>{avatarFallBack}</AvatarFallback>
            </Avatar>

            </div>
        </div>
        
    )   

}
