import LeftMenu from '@/components/custom/left-menu'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'
import { auth } from '@/services/firebase'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location: { pathname } }) => {
    await auth.authStateReady()

    if (!auth.currentUser && pathname !== '/login') throw redirect({ to: '/login' })
  },
  component: Authenticated,
})

type TypeMenu = 'TeacherClassroom' | 'StudentPortal' | 'AdminPortal'

export function Authenticated() {
  const currentUser = useCurrentUserQuery()
  const { data: User } = useGetUserQuery(currentUser?.data?.uid)

  let type: TypeMenu = 'TeacherClassroom'

  User?.type == 'professor' ? (type = 'TeacherClassroom') : ''
  User?.type == 'aluno' ? (type = 'StudentPortal') : ''
  User?.type == 'pedagogo' ? (type = 'AdminPortal') : ''

  return (
    <div className="flex">
      <LeftMenu type={type} />
      <div className="flex-1 ml-5">
        <Outlet />
      </div>
    </div>
  )
}
