import { createFileRoute } from '@tanstack/react-router'
import { Copy, ChevronLeft} from 'lucide-react'
import { X } from 'lucide-react'
import { Check } from 'lucide-react'
import avatarLogo from '@/assets/avatarLogo.svg'
import { Button } from '@/components/ui/button'
import ToastPasswordrequest from '@/components/custom/toast-password-change-request'
import { useChangePasswordRequestQuery } from '@/queries/use-change-password-request-query'
import { AlertDialog, AlertDialogHeader, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { ChangedPasswordRequests } from './password-changes'
import { Avatar } from '@mui/material'

export const Route = createFileRoute('/password-change-request')({
  component: requestChangePassword,
})

const initialValues = {
  newPasswordDefault: '',
  requestStatus: '',
  studentName: '',
}
export function requestChangePassword() {
    const {data: studentPasswordChangeRequests} = useChangePasswordRequestQuery()
    const {data: students} = useStudentsListQuery()
    

  return (
  <>
    <div className='w-10/12 p-3'>
    <div>
    {studentPasswordChangeRequests?.map(({newPasswordDefault, student}, index) => (
          <div key={index}>
            <div className='rounded-md border-2 flex p-3 items-center my-5 gap-5'>
              <img className='size-12' src={avatarLogo}/>
            <div>
            <h1 className='font-bold font-[inter]'>
            {students?.find((doc: { id: string }) =>   doc.id === student.id)?.name}
            </h1>
            <p className='text-gray-300 font-[inter]'>Curso: Aprender e crescer</p>
            </div>
      <div className='gap-3 flex ml-auto'>
        <AlertDialog>
          <AlertDialogTrigger>
          <ToastPasswordrequest/>
            </AlertDialogTrigger>
            <AlertDialogContent className='p-9  h-56 w-full'>
            <AlertDialogHeader className='flex text-start flex-row gap-3'>
            <AlertDialogCancel className='w-10'>
            <ChevronLeft className='size-8 mt-[13px]'/>
            </AlertDialogCancel>
              <AlertDialogTitle className='text-2xl'>Nova senha - {students?.find((doc: { id: string }) =>   doc.id === student.id)?.name}...</AlertDialogTitle>
              </AlertDialogHeader>
            <Button iconPosition='right' variant='ghostBlack' icon={<Copy/>} className='w-full p-6 text-xl border-2 border-black'>{students?.find((doc: { id: string }) =>   doc.id === student.id)?.cpf}</Button>  {/* Mudar para senha mais tarde, tem que mudar na querie do estudante*/}
            </AlertDialogContent>
          </AlertDialog>
          <div className='flex border h-8 rounded-md justify-center items-center p-1 '>
          <X className='text-red-700'/>
          </div>
      
      </div>
    </div>

          </div>
        ))}
    </div>

    

    </div>

  </>
  )
}