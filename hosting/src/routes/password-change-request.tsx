import { createFileRoute } from '@tanstack/react-router'
import { Copy, ChevronLeft} from 'lucide-react'
import { X } from 'lucide-react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogHeader, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogCancel } from '@/components/ui/alert-dialog'

export const Route = createFileRoute('/password-change-request')({
  component: requestChangePassword,
})

export function requestChangePassword() {
  return (
  <>
    <div className='w-10/12 p-3'>  {/* tirar padding quando terminar*/}
    
    <div className='rounded-md border-2 flex p-3 items-center'>

        <div>
          <h1 className='font-bold font-[inter]'>Ronaldinho Cleber Machado</h1>
          <p className='text-gray-300 font-[inter]'>Curso: Aprender e crescer</p>
        </div>

      <div className='gap-3 flex ml-auto'>
        <AlertDialog>
          <AlertDialogTrigger>
              <div className='flex border h-8 rounded-md justify-center items-center p-1'>
                <Check className='text-green-500 '/>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className='p-9  h-56 w-full'>

            <AlertDialogHeader className='flex text-start flex-row gap-3'>
            <AlertDialogCancel className='w-10'>
            <ChevronLeft className='size-8 mt-[13px]'/>
            </AlertDialogCancel>
              <AlertDialogTitle className='text-2xl'>Nova senha - Ronaldinho Cleber...</AlertDialogTitle>
              </AlertDialogHeader>

            <Button iconPosition='right' variant='ghostBlack' icon={<Copy/>} className='w-full p-6 text-xl border-2 border-black'> rOnaldinho22</Button>
            </AlertDialogContent>
          </AlertDialog>
          <div className='flex border h-8 rounded-md justify-center items-center p-1 '>
          <X className='text-red-700'/>
          </div>
      
      </div>
    </div>


    </div>

  </>
  )
}