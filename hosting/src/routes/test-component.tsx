import { ActivitiesMaterials } from '@/components/custom/activities-materials'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-component')({
  component: RouteActivitiesMaterials,
})

function RouteActivitiesMaterials() {
  return (
    <div className="p-2">
      <ActivitiesMaterials />
    </div>
  )
}
