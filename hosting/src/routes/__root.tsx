import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/password-changes" className="[&.active]:font-bold">
          password changes
        </Link>
        <Link to="/create-activity-material" className="[&.active]:font-bold">
          Create activity Material
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

