import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teste')({
  component: () => <div>Hello /teste!</div>,
})
