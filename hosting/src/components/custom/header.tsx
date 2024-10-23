import sudotecLogo from '@/assets/sudotecLogo.svg';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from 'lucide-react';

interface headerProps {
    avatarFallBack?: string;
    avatarImage?: string;
}

export function Header({ avatarImage, avatarFallBack }: headerProps) {
    return (
        <>
            <div className='hidden sm:flex justify-between items-center border px-16 py-4 w-full'>
                <div className='flex h-20 w-36'>
                    <img src={sudotecLogo} alt="sudotecLogo" />
                </div>
                <div className='flex'>
                    {avatarImage ? (
                        <Avatar className='flex h-12 w-12'>
                            <img src={avatarImage} alt="Avatar" />
                            <AvatarFallback>{avatarFallBack}</AvatarFallback>
                        </Avatar>
                    ) : null}
                </div>
            </div>

            <div className='flex justify-between items-center border px-4 py-1 w-full sm:hidden'>
                <div>
                    <Menu />
                </div>
                <div className='flex h-20 w-36'>
                    <img src={sudotecLogo} alt="sudotecLogo" />
                </div>
                <div className='flex'>
                    {avatarImage ? (
                        <Avatar className='flex h-12 w-12'>
                            <img src={avatarImage} alt="Avatar" />
                            <AvatarFallback>{avatarFallBack}</AvatarFallback>
                        </Avatar>
                    ) : null}
                </div>
            </div>
        </>
    );
}
