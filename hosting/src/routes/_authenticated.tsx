import { Header } from '@/components/custom/header'
import LeftMenu from '@/components/custom/left-menu'
import { auth } from '@/services/firebase'
import { createFileRoute, Outlet, redirect, useRouter } from '@tanstack/react-router'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { signOut } from 'firebase/auth'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { authStateReadyQueryOptions } from '@/queries/use-auth-state-ready-query'
import { useEffect } from 'react'
import { getCoursesQueryOptions, useGetCoursesQuery } from '@/queries/use-get-courses-query'
import { studentPersonalClassesQueryOptions, useStudentPersonalClasses } from '@/queries/use-student-personal-classes-query'
import { teacherPersonalSubjectsQueryOptions, useTeacherPersonalSubjects } from '@/queries/use-teacher-personal-subjects-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ matches, context: { queryClient } }) => {
    const isAuthStateReady = await queryClient.ensureQueryData(authStateReadyQueryOptions)
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions(isAuthStateReady))
    
    const isUserInsideAuthenticatedBoundaries = matches[1].id === '/_authenticated'

    if (!currentUser && isUserInsideAuthenticatedBoundaries) throw redirect({ to: '/login' })

    const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    const role = getRoleFromRef(user?.roleRef)

    const student = studentPersonalClassesQueryOptions(role, user?.roleRef).enabled ? 
      await queryClient.ensureQueryData(studentPersonalClassesQueryOptions(role, user?.roleRef)) : 
      undefined

    const teacher = teacherPersonalSubjectsQueryOptions(role, user?.roleRef).enabled ?
      await queryClient.ensureQueryData(teacherPersonalSubjectsQueryOptions(role, user?.roleRef)) :
      undefined
    
    return queryClient.ensureQueryData(getCoursesQueryOptions(role, student?.classes, teacher?.subjects))
  },
  component: Authenticated,
})

export function Authenticated() {
  const fullUser = useGetFullUser()
  const { data: student } = useStudentPersonalClasses(fullUser.role, fullUser.roleRef)
  const { data: teacher } = useTeacherPersonalSubjects(fullUser.role, fullUser.roleRef)
  const { data: courses } = useGetCoursesQuery(fullUser.role, student?.classes, teacher?.subjects)

  const router = useRouter()

  useEffect(() => {
    if (fullUser) return

    router.invalidate()
  }, [fullUser])

  const logout = () => {
    signOut(auth)
  }

  return (
    <div className="flex h-full">
      <div className="flex-col flex w-full">
        <Header avatarFallBack="" avatarImage={fullUser.photoURL} logout={logout} />
        <div className="flex  h-full">
          <LeftMenu type={fullUser.role} courses={courses} />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
