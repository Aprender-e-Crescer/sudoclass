import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_requests/justifications')({
  component: () => <div>Hello /_authenticated/_requests!</div>,
})
