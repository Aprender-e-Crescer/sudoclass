import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { authStateReadyQueryOptions } from '@/queries/use-auth-state-ready-query'

export const Route = createRootRoute({
  beforeLoad: async ({ matches, context: { queryClient } }) => {
    const isAuthStateReady = await queryClient.ensureQueryData(authStateReadyQueryOptions)
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions(isAuthStateReady))

    const isUserLoggedIn = !!currentUser;
    const isUserOutsideAuthenticatedBoundaries = matches[1].id !== '/_authenticated'

    if (isUserLoggedIn && isUserOutsideAuthenticatedBoundaries) throw redirect({ to: '/' })
  },
  component: () => (
    <>
      <Toaster />

      <Outlet />
      {import.meta.env.MODE !== 'production' && <TanStackRouterDevtools />}
    </>
  ),
})
