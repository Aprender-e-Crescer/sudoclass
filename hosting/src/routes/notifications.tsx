import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import avatar from '@/assets/avatar.png'
import { InputTextarea } from '@/components/custom/textarea-input'
import { Textarea } from '@/components/ui/textarea'
import { Formik } from 'formik'
import Index from '.'

export const Route = createFileRoute('/notifications')({
  component: Notifications,
})

export function Notifications(){
    const { data: students } = useStudentsListQuery()
    console.log(students)
  
    return (
  <div className='w-full p-3'>
        <h1 className='text-gray-400 font-[inter] text-xl font-semibold mb-3'>Aprender e crescer - Notificações</h1>
        <hr className='mb-3' />
    <div className='flex flex-wrap-reverse w-full gap-4'>
      <div className='flex flex-col w-96 max-sm:w-full sm:items-center'> {/**/}
        <h1 className='text-gray-300 font-[inter] font-semibold'>Nome</h1>
        {students?.map(({name}, index) => (
          <div key={index}> {/* w-10/12 */}
            <div className='flex gap-x-4 items-center w-96 max-sm:w-full border p-3'>
            <Avatar>
              <AvatarImage src={avatar}/>
              <AvatarFallback>carregando...</AvatarFallback>
            </Avatar>
              <p className=''>{name}</p>
            </div>
          </div>
        ))} 
      </div>
      <Formik>
        <div className='text-3xl font-[inter] flex-1 font-semibold p-5'>
          <h1 className='mb-2'>Digite a notificação</h1>
          <InputTextarea
          placeholder=' Não Haverá aula no dia 17/10/2024 🎉🎉🎉'
          id='textareaNotificacion'
          label='textareaNotificacion'
          name='textareaNotificacion'
          customStyle='h-[230px] p-3 max-sm:h-[130px] max-sm:text-base text-xl'
          />
        </div> 
      </Formik>{/* terminar de colocar os botoes */}
    </div>    
  </div> 
    )
}