import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import avatarLogo from '@/assets/avatarLogo.svg'

export const Route = createFileRoute('/notifications')({
  component: () => <div>Hello /notifications!</div>,
})

export function notifications(){
    const { data: teachersList } = TeachersSchemaQuery()
    console.log(teachersList)
  
    return (
      <div className="p-4">
        <div className="w-full border rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-gray-100 border-b text-[#B5B7C0]">
            <span>Professores cadastrados</span>
            <Button variant="blueButton" size="large">
              Cadastrar novo professor +
            </Button>
          </div>
          <div className="flex items-center p-4 border-b">
            <img src={avatarLogo} alt="Avatar Logo" className="w-16 h-20" />
            <h1 className="ml-4 text-xl font-semibold">Jane Cooper</h1>
          </div>
          {teachersList?.map(({ fullName }, index) => (
            <div
              key={index}
              className={flex items-center p-4 ${index !== teachersList.length - 1 ? 'border-b' : ''}}
            >
              <img src={avatarLogo} alt="Avatar" className="w-16 h-20" />
              <h1 className="ml-4 text-xl font-semibold">{fullName}</h1>
            </div>
          ))};
        </div>
    </div>
    )
  
}