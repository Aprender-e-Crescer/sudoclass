import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-activity-material')({
  component: CreateActivityMaterial,
})

export function CreateActivityMaterial() {
  return (
    <>
      <h1>Teste</h1>
    </>
  )
}
