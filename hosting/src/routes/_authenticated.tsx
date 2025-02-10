import { AppSidebar } from "@/components/custom/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useFirestoreRealtimeQueries } from '@/hooks/use-firestore-realtime-queries'
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getClassesQueriesOptions } from '@/queries/use-get-classes-query'
import { getCoursesFirestoreQuery, getCoursesQueryOptions } from '@/queries/use-get-courses-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getStudentPersonalClassesFirestoreQuery, getStudentPersonalClassesQueryOptions } from '@/queries/use-student-personal-classes-query'
import { getTeacherPersonalSubjectsFirestoreQuery, getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

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
    
    const courses = await queryClient.ensureQueryData(getCoursesQueryOptions(role, student?.data()?.classes, teacher?.data()?.subjects))

    const classesQueriesOptions = getClassesQueriesOptions(courses.docs.map(course => course.data()), role, student?.data()?.classes, teacher?.data()?.subjects)

    await Promise.all(classesQueriesOptions.map(({ classesQueryOptions }) => queryClient.ensureQueryData(classesQueryOptions)))
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
  
  const classesQueriesOptions = getClassesQueriesOptions(courses, fullUser.role, student?.classes, teacher?.subjects)

  useFirestoreRealtimeQueries(classesQueriesOptions.map(({ classesQueryOptions, classesFirestoreQuery }) => ({ queryKey: classesQueryOptions.queryKey, q: classesFirestoreQuery})))

  const allClasses = useSuspenseQueries({ queries: classesQueriesOptions.map(({ classesQueryOptions }) => classesQueryOptions) })

  const coursesWithClasses = courses.map(course => ({
    ...course,
    classes: allClasses.find(({ data }) => data.some(({ idCourse }) => idCourse === course.id))?.data,
  }))
  
  return (
    <SidebarProvider>
      <AppSidebar role={fullUser.role} coursesWithClasses={coursesWithClasses} />
      <main className="flex flex-col w-full h-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
