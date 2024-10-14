import sudotecLogo from '@/assets/sudotecLogo.svg'
import { Avatar, AvatarFallback,} from "@/components/ui/avatar"


interface props {
    Logo: string
    AvatarFallBack: string
    AvatarImage: string
}
export function Header ({ Logo = sudotecLogo, AvatarImage, AvatarFallBack}: props) {
    return(
        <div className='flex justify-between items-center border'>
            <div className='flex h-24 w-40 ml-10 '>
                <img src= {Logo} alt="sudotecLogo" />
            </div>
            <div className='flex h-11 w-11 mr-10'>
            <Avatar>
                <img src={AvatarImage} />
                <AvatarFallback>{AvatarFallBack}</AvatarFallback>
            </Avatar>

            </div>
        </div>
        


    )



}