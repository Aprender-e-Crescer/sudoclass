import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import {Activities} from '@/routes/activities'

export const Route = createRootRoute({
  component: () => (
    <>
      <Activities />
      {/* <Outlet />
      <TanStackRouterDevtools /> */}
    </>
  ),
})