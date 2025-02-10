import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, X, GraduationCap, Shield, Users2 } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/users/')({
  component: RouteComponent,
})

const roles = [
    {
      icon: Users2,
      title: "Aluno",
      description: "Cadastrar novo aluno no sistema",
      to: "./register/student",
    },
    {
      icon: GraduationCap,
      title: "Professor",
      description: "Cadastrar novo professor no sistema",
      to: "./register/teacher",
    },
    {
      icon: Shield,
      title: "Administrador",
      description: "Cadastrar novo administrador no sistema",
      to: "./register/admin",
    },
]

const users = [{
    id: '1',
    photoUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    name: 'John Doe',
    role: 'student',
    to: './register/student',
},
{
    id: '2',
    photoUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    name: 'Jane Doe',
    role: 'teacher',
    to: './register/teacher',
},
{
    id: '3',
    photoUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    name: 'John Doe',
    role: 'admin',
    to: './register/admin',
}]

function RouteComponent() {
  return (
    <div className='flex flex-col gap-y-5'>
        <div className='flex px-8 py-4 gap-4'>
            <input type="text" placeholder='Usuários cadastrados' className='py-4 px-2 text-sm rounded-lg flex-1' />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="medium" icon={<Plus size={16} />} type="button" variant="blueButton" className='flex items-center gap-3'>
                        Novo usuário
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[340px] md:max-w-[650px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex">
                            <h1 className="flex-1">
                                Selecione o tipo de usuário
                            </h1>
                            <AlertDialogCancel asChild className="h-0 border-none">
                                <div className="mt-[unset] -m-12">
                                    <X size={20} className="text-gray-500 cursor-pointer" />
                                </div>
                            </AlertDialogCancel>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Selecione o tipo de usuário que você deseja cadastrar no sistema
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className="container mx-auto px-0 md:px-4">
                            <div className="grid gap-2 md:gap-6 md:grid-cols-3 justify-center overflow-y-auto">
                                {roles.map(({ title, description, to, icon: Icon}) => (
                                    <div
                                        key={title}
                                        className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 md:p-6 flex flex-col gap-2 md:gap-4 max-w-[300px]"
                                    >
                                        <div className="p-2 md:p-3 flex self-start bg-gray-100 rounded-full">
                                            <Icon className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
                                        </div>
                                        <h2 className="text:lg md:text-xl font-semibold text-left">{title}</h2>
                                        <p className="text-sm md:text-md text-muted-foreground text-left">{description}</p>
                                        <Link to={to} search={{ action: 'create' }} className="mt-auto w-full">
                                            <Button className="w-full" variant="outline">
                                                Selecionar
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        <div className='flex flex-col'>
            <hr />
            {users.map(({ id, photoUrl, name, role, to }) => (
                <>
                    <Link to={to} search={{ action: 'edit', id }}>
                        <div className='flex items-center gap-x-5 px-5 py-3 text-sm cursor-pointer'>
                            <img src={photoUrl} alt="User photo" className='h-9 w-9 rounded-full' />
                            <div>
                                <h4>{name}</h4>
                                <p className='text-gray-500 text-xs'>{role}</p>
                            </div>
                        </div>
                    </Link>
                    <hr />
                </>
            ))}
        </div>
    </div>
  )
}
