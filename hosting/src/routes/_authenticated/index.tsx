import { useGetFullUser } from '@/hooks/use-get-full-user'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

export function Index() {
  const { currentUser, user, teacher, pedagogue, student } = useGetFullUser()

  console.log({ currentUser, user, teacher, pedagogue, student })

  return <div>Oi /</div>
}
