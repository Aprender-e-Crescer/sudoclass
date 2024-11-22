import LeftMenu from '@/components/custom/left-menu'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/register/_register')({
  component: () => (
    <div className="flex flex-1">
      <LeftMenu type="AdminPortal" />
      <Outlet />
    </div>
  ),
})
