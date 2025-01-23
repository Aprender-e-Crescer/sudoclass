import sudotecLogo from '@/assets/sudotecLogo.svg'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Menu } from 'lucide-react'
import { DropdownHeaderAccount } from './dropdown-header-account'

export interface HeaderProps {
  avatarFallBack?: string
  avatarImage?: string
  logout: () => void
}

export function Header({ avatarImage, avatarFallBack, logout }: HeaderProps) {
  return (
    <>
      <div className="hidden sm:flex justify-between items-center border px-10 py-4 w-full">
        <div className="flex h-20 w-36">
          <img src={sudotecLogo} alt="sudotecLogo" />
        </div>
        <div className="flex">
        <DropdownHeaderAccount onClickLogout={logout}>
          {avatarImage ? (
            <Avatar className="flex h-12 w-12">
              <img src={avatarImage} alt="Avatar" className="flex rounded-full" />
              <AvatarFallback>{avatarFallBack}</AvatarFallback>
            </Avatar>
          ) : null}
        </DropdownHeaderAccount>
        </div>
      </div>

      <div className="flex justify-between items-center border px-4 py-1 w-full sm:hidden">
        <div>
          <Menu />
        </div>
        <div className="flex h-20 w-36">
          <img src={sudotecLogo} alt="sudotecLogo" />
        </div>
        <div className="flex">
          <DropdownHeaderAccount onClickLogout={logout}>
            {avatarImage ? (
              <Avatar className="flex h-12 w-12">
                <img src={avatarImage} alt="Avatar" />
                <AvatarFallback>{avatarFallBack}</AvatarFallback>
              </Avatar>
            ) : null}
          </DropdownHeaderAccount>
        </div>
      </div>
    </>
  )
}
