import { createRootRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/services/firebase'

export const Route = createRootRoute({
  beforeLoad: () => {
    if (auth.currentUser) throw redirect({ to: '/' })
  },
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </div>

      <Toaster />

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
