import { createFileRoute } from '@tanstack/react-router'
import { CardSubject } from '@/components/custom/card-subject'
import { Header } from '@/components/custom/header'

export const Route = createFileRoute('/home-list-subjects')({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      <div className="h-full">
        <Header />
      </div>
      <CardSubject />
      <CardSubject />
      <CardSubject />
      <CardSubject />
    </div>
  )
}
