import { createFileRoute } from '@tanstack/react-router'
import { CardSubject } from '@/components/custom/card-subject'

export const Route = createFileRoute('/home-list-subjects')({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-32">
      <CardSubject />
      <CardSubject />
      <CardSubject />
      <CardSubject />
      <p>oi </p>
    </div>
  )
}
