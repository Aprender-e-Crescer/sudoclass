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
        <Link to="/confirmation-screen" className="[&.active]:font-bold">
          confirmation screen
        </Link>
        <Link to="/class-user-resgistration" className="[&.active]:font-bold">
          user registration class
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
