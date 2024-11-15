import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_matter')({
  component: Matter,
})

export function Matter() {
  return 'Hello /_authenticated/_matter!'
}
