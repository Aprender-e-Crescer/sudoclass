import sudotecLogo from '@/assets/sudotecLogo.svg'
import avatarLogo from '@/assets/avatarLogo.svg'
import { Header } from '@/components/custom/header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/header')({
  component: RouteHeader,
});

function RouteHeader() {
  return (
    <div>
      <Header 
      Logo= {sudotecLogo}
      AvatarLogo={avatarLogo}/>
    </div>
  );
}