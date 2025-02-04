import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { Button } from '@/components/ui/button'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { createFileRoute } from '@tanstack/react-router'
import { PencilLine, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/courses-management')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions())
    const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    const role = getRoleFromRef(user?.roleRef)
    // if (role !== 'admin') throw redirect({ to: '/' })
  },
  component: CoursesManagement,
})
function CoursesManagement() {
  return (
    // <NotFound
    //   title="Ops! Nada por aqui..."
    //   description="Este curso ainda não tem turmas. Que tal criar a primeira?"
    //   blueButtonText="Criar turma"
    //   whiteButtonText="Cancelar"
    //   linkToBlueButton="/"
    //   linkToWhiteButton="/"
    // />
    <ManagementHeader title="Cursos" />
  )
}
