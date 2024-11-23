import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

export function Index() {
  return <Outlet />
}
