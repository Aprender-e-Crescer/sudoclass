import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/$idClass/forms/$idForm')({
  component: Outlet,
})
