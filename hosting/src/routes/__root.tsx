import { createRootRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/services/firebase'

export const Route = createRootRoute({
  beforeLoad: async ({ location: { pathname } }) => {
    await auth.authStateReady()
    
    if (auth.currentUser && pathname !== '/') throw redirect({ to: '/' })
  },
  component: () => (
    <>
      <Toaster />

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
