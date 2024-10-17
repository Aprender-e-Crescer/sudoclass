import { Header } from '@/components/custom/header'
import LeftMenu from '@/components/custom/left-menu'
import { SubHeader } from '@/components/custom/subheader'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-activity-material')({
  component: CreateActivityMaterial,
})

export function CreateActivityMaterial() {
  return (
    <>
      <div>
        <Header avatarFallBack="" avatarImage="" />
        <div className="flex ">
          <LeftMenu type="TeacherClassroom" />
          <div className="flex items-center">
            <div className="border-l border-gray-300 h-full mx-1"></div>
          </div>
          <div className="flex w-full h-10 items-center justify-around">
            <SubHeader />
            <Button variant="blueButton" size="small">
              Reunião
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
