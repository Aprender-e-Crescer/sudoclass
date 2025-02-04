import { useCreateSchoolCallMutation } from '@/mutations/use-create-call-mutation'
import { getClassQueryOptions } from '@/queries/use-class-query'
import { getProfileQueryOptions } from '@/queries/use-get-profile-query'
import { useQueries, useQuery } from '@tanstack/react-query'

interface CallControllerProps {
  idCourse: string
  idClass: string
  idSubject: string
  idLessonPlan: string
}

export function useCallController({ idCourse, idClass }: CallControllerProps) {
  const { data: classData } = useQuery(getClassQueryOptions(idCourse, idClass))
  const students = useQueries({
    queries: classData?.studentsProfile.map((studentProfile) => getProfileQueryOptions(studentProfile)) ?? [],
    combine: (results) => results
      .map((result) => result.data)
      ?.filter((student) => student !== undefined),
  })
  
  const { mutateAsync: createSchoolCall, isPending: isCreateSchoolCallPending } = useCreateSchoolCallMutation()

  return {
    students,
    createSchoolCall,
    isCreateSchoolCallPending,
  }
}
