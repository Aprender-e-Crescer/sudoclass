import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/register/_register/students/',
)({
  component: () => (
    <div>Hello /_authenticated/register/_register/students/!</div>
  ),
})
