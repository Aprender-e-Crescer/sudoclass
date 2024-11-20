import { auth } from '@/services/firebase'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  // beforeLoad: () => {
  //   if (!auth.currentUser) throw redirect({ to: '/login' })
  // },
  component: Authenticated,
})

export function Authenticated() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
