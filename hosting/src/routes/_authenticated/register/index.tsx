import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/register/')({
  beforeLoad: () => {
    throw redirect({
      to: '/register/students',
    })
  },
})
