import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/users/register/responsible',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/users/register/student"!</div>
}
