import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/services/firebase'

export const Route = createRootRoute({
  beforeLoad: async ({ matches }) => {
    await auth.authStateReady()
    
    if (auth.currentUser && matches[1].id !== "/_authenticated") throw redirect({ to: '/' })
  },
  component: () => (
    <>
      <Toaster />

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
