import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import avatar from '@/assets/avatar.png'
import { InputTextarea } from '@/components/custom/textarea-input'
import { Formik } from 'formik'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/notifications')({
  component: Notifications,
})

export function Notifications() {
  const { data: students } = useStudentsListQuery()
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const toggleStudentSelection = (index: number) => {
    setSelectedStudents(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="w-full p-3">
      <h1 className="text-gray-400 font-[inter] text-xl font-semibold mb-3">
        Aprender e crescer - Notificações
      </h1>
      <hr className="mb-3" />
      <div className="flex flex-wrap-reverse w-full gap-4">
        <div className="flex flex-col w-96 max-sm:w-full sm:items-center">
          <h1 className="text-gray-300 font-[inter] font-semibold">Nome</h1>
          {students?.map(({ name }, index) => (
            <div key={index} onClick={() => toggleStudentSelection(index)}>
              <div className={`flex gap-x-4 items-center w-96 max-sm:w-full border p-3 cursor-pointer transition-colors ${selectedStudents.includes(index) ? 'bg-green-400 ' : ''}`}>
                <Avatar>
                  <AvatarImage src={avatar} />
                  <AvatarFallback>carregando...</AvatarFallback>
                </Avatar>
                <p className="">{name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='max-xl:w-full xl:w-[70%]'>
          <Formik>                          
              <InputTextarea
              titleTextArea='Digite a notificação'
                placeholder=" Não Haverá aula no dia 17/10/2024 🎉🎉🎉"
                id="textareaNotificacion"
                label="textareaNotificacion"
                name="textareaNotificacion"
                customStyle="h-[230px] w-full p-3 max-sm:h-[130px] max-sm:text-base text-xl"
              />
          </Formik>
          <div className='flex sm:gap-10 max-sm:flex-col'>
            <Button variant='blueButton' className='mt-2 w-full' >Enviar Apenas para alunos selecionados</Button>
            <Button variant='blueButton' className='mt-2 w-full'>Enviar Para todos os alunos</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
