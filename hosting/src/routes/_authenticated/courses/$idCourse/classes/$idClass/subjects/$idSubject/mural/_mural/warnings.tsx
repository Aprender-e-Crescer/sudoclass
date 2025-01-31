import { CardComponent } from '@/components/custom/card-bolletin-board'
import { CustomLoading } from '@/components/custom/custom-loading'
import { Warning } from '@/components/custom/warning'
import { useWarningController } from '@/controllers/use-warnings-controller'
import { createFileRoute } from '@tanstack/react-router'
import avatarPlaceholder from '@/assets/user.png'
import { SendHorizonal } from 'lucide-react'
import { When } from 'react-if'
import { useCreateWarningMutation } from '@/mutations/use-create-warning-mutation' // Importando a mutação
import { useState } from 'react'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/warnings',
)( {
  component: WallSubjects,
})

export function WallSubjects() {
  const { idCourse, idClass, idSubject } = Route.useParams()
  const { isLoading, subject, course, fullUser, warningsWithSentByProfiles } = useWarningController({ idCourse, idClass, idSubject })
  
  const { mutate: createWarning, isLoading: isCreatingWarning } = useCreateWarningMutation()
  
  const [message, setMessage] = useState('') 

  const hasPermissionToSendWarning = fullUser?.role === 'teacher' || fullUser?.role === 'admin'

  const handleSendWarning = () => {
    if (!message.trim()) {
      alert('Por favor, insira uma mensagem no aviso.')
      return
    }
  
    createWarning({
      message,
      idCourse,
      idClass,
      idSubject,
      authorId: fullUser?.uid ?? '', 
    })
    
    setMessage('') 
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CustomLoading message="Carregando mural" size={70} />
      </div>
    )
  }

  if (!subject || !course || !fullUser) throw new Error('Unexpected error')

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full max-w-screen-lg p-4 sm:p-6 flex flex-col gap-5">
        <div className="my-2 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name={subject.name} courseName={course.name} color={subject.color} />
        </div>
        
        <When condition={hasPermissionToSendWarning}>
          <div>
            <div className="flex items-center border-2 p-7 rounded-lg shadow-xl">
              <img src={fullUser.photoURL ?? avatarPlaceholder} alt="Icon" className="w-12 h-12 mr-2 rounded-full " />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Atualiza o estado de message
                placeholder="Escreva um aviso para sua turma"
                className="flex-grow p-2 rounded-md mx-4 focus:ring-2 focus:ring-gray-200 focus:outline-none"
              />
              <button onClick={handleSendWarning} disabled={isCreatingWarning}>
                <SendHorizonal className={isCreatingWarning ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </When>

        <div className="flex flex-col p-5 gap-5">
          {warningsWithSentByProfiles?.map(({ author, date, id, key, message }) => (
            <Warning key={key} id={id} date={date} message={message} author={author} idCourse={idCourse} idClass={idClass} idSubject={idSubject} />
          ))}
        </div>
      </div>
    </div>
  )
}
