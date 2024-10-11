import sudotecLogo from '@/assets/sudotecLogo.svg'
import avatarLogo from '@/assets/avatarLogo.svg'


interface props {
    Logo: string
    AvatarLogo: string
}
export function Header ({ Logo = sudotecLogo, AvatarLogo = avatarLogo}: props) {
    return(
        <div className='flex justify-between items-center border'>
            <div className='flex h-24 w-40 ml-10'>
                <img src= {Logo} alt="sudotecLogo" />
            </div>
            <div className='flex h-11 w-11 mr-10'>
                <img src= {AvatarLogo} alt="avatarLogo" />
            </div>
        </div>
        


    )



}