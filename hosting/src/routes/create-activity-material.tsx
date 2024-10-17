import LeftMenu from '@/components/custom/left-menu'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-activity-material')({
  component: CreateActivityMaterial,
})

export function CreateActivityMaterial() {
  return (
    <>
      <div className="flex ">
        <LeftMenu type="TeacherClassroom" />
        <div>
          <h1>Teste</h1>
        </div>
      </div>
    </>
  )
}
