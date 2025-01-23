import { PropsWithChildren } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "@tanstack/react-router";

interface Props extends PropsWithChildren {
  onClickLogout: () => void
}

export function DropdownHeaderAccount({ children, onClickLogout }: Props) {
    return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {children}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to="/profile-changes">
                <DropdownMenuItem>Minha conta</DropdownMenuItem>
            </Link>
            <DropdownMenuItem className='font-bold' onClick={onClickLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    )
}