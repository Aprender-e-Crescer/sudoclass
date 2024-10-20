import { createFileRoute } from '@tanstack/react-router'
import { SquareCheck } from 'lucide-react'
import { X } from 'lucide-react'
export const Route = createFileRoute('/password-change-request')({
  component: requestChangePassword,
})

export function requestChangePassword() {
  return (
  <>
    <div className='w-11/12 p-3'>  {/* tirar padding quando terminar*/}
    
    <div className='rounded-md border-2 flex p-3'>
        <div>
        <h1 className='font-bold'>Ronaldinho Cleber Machado</h1>
        <p className='text-gray-300'>Curso: Aprender e crescer</p>
        </div>

        <div className='border'>
        <X className='text-red-700'/>
        </div>
    </div>


    </div>

  </>
  )
}
