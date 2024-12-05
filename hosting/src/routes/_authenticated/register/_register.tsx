import { SubHeader } from '@/components/custom/subheader'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/register/_register')({
  component: () => (
    <div className="flex flex-1 flex-col">
      <SubHeader hasPrivilege="pedagogo" />
      <Outlet />
    </div>
  ),
})
