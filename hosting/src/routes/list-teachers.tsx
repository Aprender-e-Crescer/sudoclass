import { TeachersSchemaQuery } from '@/queries/teachers-listing-query'
import { createFileRoute } from '@tanstack/react-router'
import avatarLogo from '@/assets/avatarLogo.svg'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/list-teachers')({
  component: TeacherList,
})

export function TeacherList() {
  const { data: teachersList } = TeachersSchemaQuery()
  return (
    <div className="p-2">
      <div className="w-full border overflow-hidden">
        <div className="flex justify-between items-center ml-2 p-4 text-[#B5B7C0]">
          <span>Professores cadastrados</span>
          <Button variant="blueButton" size="large">
            Cadastrar novo professor +
          </Button>
        </div>
        <div className="flex items-center border-t p-4">
          <img src={avatarLogo} alt="Avatar Logo" className="w-12 h-18 ml-16" /> 
          <h1 className="ml-16 text-xl font-semibold">Jane Cooper</h1> 
        </div>
        {teachersList?.map(({ fullName }, index) => (
          <div
            key={index}
            className={`flex items-center p-4 ${index !== teachersList.length - 1 ? 'border-b' : ''}`}
          >
            <img src={avatarLogo} alt="Avatar" className="w-12 h-18 ml-16" /> 
            <h1 className="ml-16 text-xl font-semibold">{fullName}</h1> 
          </div>
        ))}
      </div>
    </div>
  )
}
