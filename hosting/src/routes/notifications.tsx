import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TeachersSchemaQuery } from '@/queries/teachers-listing-query'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import avatar from '@/assets/avatar.png'
import Index from '.'

export const Route = createFileRoute('/notifications')({
  component: notifications,
})

export function notifications(){
    const { data: students } = useStudentsListQuery()
    console.log(students)
  
    return (
    <div className='w-11/12 p-3'>
        <h1 className='text-gray-400 font-[inter] text-xl font-semibold mb-3'>Aprender e crescer - Notificações</h1>   
      <div className='flex flex-col items-center justify-center '>
        <h1 className='text-gray-300 font-[inter] font-semibold'>Nome</h1>
        {students?.map(({name}, index) => (
          <div key={index}> {/* w-10/12 */}
            <div className='flex gap-x-4 items-center w-96 border p-3'>
            <Avatar>
              <AvatarImage src={avatar}/>
              <AvatarFallback>carregando...</AvatarFallback>
            </Avatar>
              <p className=''>{name}</p>
            </div>

          </div>
        ))} 
        
        
        
      
      </div>
     
     
    </div> 
    )
}