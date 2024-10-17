import { Header } from '@/components/custom/header'
import LeftMenu from '@/components/custom/left-menu'
import ListStudents from '@/components/custom/list-students'
import { SubHeader } from '@/components/custom/subheader'
import { TeacherComment } from '@/components/custom/teacher-comment'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/view-activity')({
  component: ViewActivity,
})

function ViewActivity() {
  const { data: students } = useStudentsListQuery()

  return (
    <div>
      <Header avatarImage="" avatarFallBack="" />
      <div className="flex">
        <LeftMenu type="TeacherClassroom" />
        <div className="max-h-screen border border-gray-300"></div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row items-center justify-around px-4 py-2">
            <SubHeader />
            <Button variant="blueButton" size="small">
              Reunião
            </Button>
          </div>
          <hr />
          <div className="flex flex-grow">
            <div>
              {students?.map((student) => (
                <ListStudents key={student.id} name={student.name} picture="" variant="corrected" />
              ))}
            </div>
            <div className="max-h-screen border border-gray-300"></div>
            <div className=" hidden lg:flex flex-col justify-center w-full items-center gap-y-10 mt-5">
              <div className="flex gap-x-10">
                <Input placeholder="Nota" className="w-48" />
                <Button variant="blueButton" size="small">
                  Devolver
                </Button>
              </div>
              <div>
                <Input type="file" className="h-96 w-80" />
              </div>
              <div className="flex flex-col w-full max-w-[400px] gap-y-3 border border-gray-300 p-3 rounded-md">
                <TeacherComment avatarSrc="" comment="teste" date="17/10/2024" name="Enzo Guis" textAvatar="EG" />
                <Input placeholder="escreva seu comentário" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
