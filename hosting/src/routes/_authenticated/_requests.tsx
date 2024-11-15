import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_requests')({
  component: Requests,
})

export function Requests() {
  return <Outlet />
}
