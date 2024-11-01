import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/update-lesson-plan')({
  component: () => <div>Hello /update-lesson-plan!</div>,
})
