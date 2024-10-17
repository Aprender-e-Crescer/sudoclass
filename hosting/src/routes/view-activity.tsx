import { Header } from '@/components/custom/header'
import ListStudents from '@/components/custom/list-students'
import { SubHeader } from '@/components/custom/subheader'
import { Button } from '@/components/ui/button'
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
      <div className="flex justify-around w-full py-4">
        <SubHeader />
        <Button variant="blueButton" size="small">
          Reunião
        </Button>
      </div>
      <hr />
      {students?.map((student) => <ListStudents key={student.id} name={student.name} picture="" variant="corrected" />)}
    </div>
  )
}
