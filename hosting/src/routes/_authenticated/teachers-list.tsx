import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/teachers-list')({
  component: () => <div>Hello /teachers-list!</div>,
})
