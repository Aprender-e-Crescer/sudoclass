import { auth } from '@/services/firebase'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: Home,
  beforeLoad: () => {
    if (!auth.currentUser) throw redirect({ to: '/login' })
  },
})

export function Home() {
  return <Outlet />
}
