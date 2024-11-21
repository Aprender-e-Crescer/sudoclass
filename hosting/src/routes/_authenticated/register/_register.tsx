import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/register/_register')({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
})
