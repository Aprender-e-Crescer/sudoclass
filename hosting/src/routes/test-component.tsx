import { ActivitiesMaterials } from '@/components/custom/activities-materials'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-component')({
  component: RouteActivitiesMaterials,
})

function RouteActivitiesMaterials() {
  return (
    <div className="p-2">
      <ActivitiesMaterials title="teste 1" dataAtv="11-10-2024" />
      <ActivitiesMaterials title="teste 2" dataAtv="12-11-2024" />
    </div>
  )
}
