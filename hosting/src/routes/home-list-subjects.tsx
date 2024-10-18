import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home-list-subjects')({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  return (
    <div>
      <p>oi</p>
    </div>
  )
}
