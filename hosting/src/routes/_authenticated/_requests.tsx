import { SubHeader } from '@/components/custom/subheader'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_requests')({
  component: Requests,
})

export function Requests() {
  return (
    <div className="flex flex-col flex-1">
      <SubHeader type="requests" />
      <Outlet />
    </div>
  )
}
