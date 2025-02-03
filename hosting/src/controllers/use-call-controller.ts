import { useCreateSchoolCallMutation } from '@/mutations/use-create-call-mutation'
import { getClassQueryOptions } from '@/queries/use-class-query'
import { getProfileQueryOptions } from '@/queries/use-get-profile-query'
import { useQueries, useQuery } from '@tanstack/react-query'


export type StudentStatus = 'undefined' | 'present' | 'lack' | 'corrected' | 'notCorrected' | undefined

interface CallControllerProps {
  idCourse: string
  idClass: string
  idSubject: string
  idLessonPlan: string
}

export function useCallController({ idCourse, idClass, idSubject, idLessonPlan }: CallControllerProps) {
  const { data: classData } = useQuery(getClassQueryOptions(idCourse, idClass))
  const students = useQueries({
    queries: classData?.studentsProfile.map((studentProfile) => getProfileQueryOptions(studentProfile)) ?? [],
    combine: (results) => results.map((result) => result.data),
  })
  const { mutateAsync: createSchoolCall } = useCreateSchoolCallMutation(idCourse, idClass, idSubject, idLessonPlan)

  return {
    students,
    createSchoolCall,
  }
}
