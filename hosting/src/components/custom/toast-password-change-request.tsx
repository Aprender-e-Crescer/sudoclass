import { Check } from 'lucide-react'
import {toast,Toaster } from 'react-hot-toast'
import { CheckCheck } from 'lucide-react'

export default function ToastPasswordrequest() {
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
    <div>
      <div className='flex border h-8 rounded-md justify-center items-center p-1'  onClick={handleClick} >
            <Check className='text-green-500'/>
              </div>
      <Toaster />
    </div>
  )
}