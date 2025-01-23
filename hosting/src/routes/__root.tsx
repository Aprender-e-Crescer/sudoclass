import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/services/firebase'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'

export const Route = createRootRoute({
  beforeLoad: async ({ matches, context: { queryClient } }) => {
    await queryClient.ensureQueryData(currentUserQueryOptions)

    if (auth.currentUser && matches[1].id !== '/_authenticated') throw redirect({ to: '/' })
  },
  component: () => (
    <>
      <Toaster />

      <Outlet />
      {import.meta.env.MODE !== 'production' && <TanStackRouterDevtools />}
    </>
  ),
})
