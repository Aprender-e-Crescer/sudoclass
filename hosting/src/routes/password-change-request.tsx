import { createFileRoute } from '@tanstack/react-router'
import { Copy, ChevronLeft} from 'lucide-react'
import { X } from 'lucide-react'
import { Check } from 'lucide-react'
import {toast,Toaster } from 'react-hot-toast'
import { CheckCheck } from 'lucide-react'
import avatarLogo from '@/assets/avatarLogo.svg'
import { Button } from '@/components/ui/button'
import { useChangePasswordRequestQuery } from '@/queries/use-change-password-request-query'
import { AlertDialog, AlertDialogHeader, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { useStudentsListQuery } from '@/queries/use-students-list-query'

export const Route = createFileRoute('/password-change-request')({
  component: RequestChangePassword,
})

const initialValues = {
  newPasswordDefault: '',
  requestStatus: '',
  studentName: '',
}
export function RequestChangePassword() {
    const {data: studentPasswordChangeRequests} = useChangePasswordRequestQuery()
    const {data: students} = useStudentsListQuery()

    const handleClick = () => {
      toast.custom(
        (t) => (
      
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } w-80  h-14   bg-green-400 border-2 gap-3 border-[#03A300] shadow-lg rounded-md text-[#03A300] flex items-center justify-center`}
          >Atualizado com sucesso <CheckCheck/></div>
  
        ),
        {
          position: 'bottom-right',
          duration: 2000,
        }
      )
    }

  return (
  <>
        {students?.map(({name}, index) => (
    <div key={index}>
      <div className='rounded-md border-2 w-10/12 flex p-3 items-center my-5 gap-5'>
                <img className='size-12' src={avatarLogo}/>
            <div>
                  <h1 className='font-bold font-[inter]'>
                {name}
                  </h1>
                <p className='text-gray-300 font-[inter]'>Curso: Aprender e crescer</p>
            </div>
          <div className='gap-3 flex ml-auto'>
            <AlertDialog>
              <AlertDialogTrigger>
              <div>
                <div className='flex border h-8 rounded-md justify-center items-center p-1'  onClick={handleClick} >
                    <Check className='text-green-500'/>
                </div>
                <Toaster />
              </div>
                </AlertDialogTrigger>
                <AlertDialogContent className='p-9  h-56 w-full'>
                <AlertDialogHeader className='flex text-start flex-row gap-3'>
                <AlertDialogCancel className='w-10'>
                <ChevronLeft className='size-8 mt-[13px]'/>
                </AlertDialogCancel>
                  <AlertDialogTitle className='text-2xl'>Nova senha - {name}</AlertDialogTitle>
                  </AlertDialogHeader>
                <Button iconPosition='right' variant='ghostBlack' icon={<Copy/>} className='w-full p-6 text-xl border-2 border-black'>{name}</Button>  {/* Mudar para senha mais tarde, tem que mudar na querie do estudante*/}
                </AlertDialogContent>
              </AlertDialog>
                <div className='flex border h-8 rounded-md justify-center items-center p-1 '>
                  <X className='text-red-700'/>
                </div>
          
          </div>
      </div>

    </div>
   ))}
  </>
  )
}