import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/register/_register')({
  component: () => (
    <div className="flex flex-1">
      <Outlet />
    </div>
  ),
})
