import { Header } from '@/components/custom/header'
import LeftMenu from '@/components/custom/left-menu'
import ListStudents from '@/components/custom/list-students'
import { SubHeader } from '@/components/custom/subheader'
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
      <Header avatarImage="" avatarFallBack="" logo="" />
      <div className="flex">
        <LeftMenu type="TeacherClassroom" />
        <div className="flex flex-col w-full h-full flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2">
            <SubHeader />
            <Button variant="blueButton" size="small">
              Reunião
            </Button>
          </div>
          <hr />
          <div className="flex flex-grow">
            <div className="px-4 py-2">
              {students?.map((student) => (
                <ListStudents key={student.id} name={student.name} picture="" variant="corrected" />
              ))}
            </div>
            <div className="max-h-screen border border-gray-300"></div>
            <div className=" hidden lg:flex justify-center w-full items-center gap-x-10">
              <Input placeholder="Nota" className="w-48" />
              <Button variant="blueButton" size="small">
                Devolver
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
