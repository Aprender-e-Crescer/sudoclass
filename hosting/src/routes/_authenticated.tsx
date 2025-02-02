import { Header } from '@/components/custom/header'
import LeftMenu from '@/components/custom/left-menu'
import { auth } from '@/services/firebase'
import { createFileRoute, Outlet, redirect, useRouter } from '@tanstack/react-router'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { signOut } from 'firebase/auth'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { useEffect } from 'react'
import { getCoursesFirestoreQuery, getCoursesQueryOptions } from '@/queries/use-get-courses-query'
import { getStudentPersonalClassesQueryOptions, getStudentPersonalClassesFirestoreQuery } from '@/queries/use-student-personal-classes-query'
import { getTeacherPersonalSubjectsQueryOptions, getTeacherPersonalSubjectsFirestoreQuery } from '@/queries/use-teacher-personal-subjects-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ matches, context: { queryClient } }) => {
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions())
    
    const isUserInsideAuthenticatedBoundaries = matches[1].id === '/_authenticated'

    if (!currentUser && isUserInsideAuthenticatedBoundaries) throw redirect({ to: '/login' })

    const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    const role = getRoleFromRef(user?.roleRef)

    const student = getStudentPersonalClassesQueryOptions(role, user?.roleRef).enabled ? 
      await queryClient.ensureQueryData(getStudentPersonalClassesQueryOptions(role, user?.roleRef)) : 
      undefined

    const teacher = getTeacherPersonalSubjectsQueryOptions(role, user?.roleRef).enabled ?
      await queryClient.ensureQueryData(getTeacherPersonalSubjectsQueryOptions(role, user?.roleRef)) :
      undefined
    
    return queryClient.ensureQueryData(getCoursesQueryOptions(role, student?.data()?.classes, teacher?.data()?.subjects))
  },
  component: Authenticated,
})

export function Authenticated() {
  const fullUser = useGetFullUser()
  
  const studentPersonalClassesQueryOptions = getStudentPersonalClassesQueryOptions(fullUser.role, fullUser.roleRef)
  const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(fullUser.role, fullUser.roleRef)
  
  const { data: student } = useQuery(studentPersonalClassesQueryOptions)
  const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)

  const coursesQueryOptions = getCoursesQueryOptions(fullUser.role, student?.classes, teacher?.subjects)

  const { data: courses } = useSuspenseQuery(coursesQueryOptions)

  useFirestoreRealtimeQuery(studentPersonalClassesQueryOptions.queryKey, getStudentPersonalClassesFirestoreQuery(fullUser.roleRef))
  useFirestoreRealtimeQuery(teacherPersonalSubjectsQueryOptions.queryKey, getTeacherPersonalSubjectsFirestoreQuery(fullUser.roleRef))
  useFirestoreRealtimeQuery(coursesQueryOptions.queryKey, getCoursesFirestoreQuery(fullUser.role, student?.classes, teacher?.subjects))

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
