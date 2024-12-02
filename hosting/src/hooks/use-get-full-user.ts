import { Pedagogue } from '@/models/pedagogue-schema'
import { Student } from '@/models/student-schema'
import { Teacher } from '@/models/teachers-schema'
import { User } from '@/models/user-schema'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetPedagogueQuery } from '@/queries/use-get-pedagogue-query'
import { useGetStudentQuery } from '@/queries/use-get-student-query'
import { useGetTeacherQuery } from '@/queries/use-get-teacher-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'

function getName(
  type: User['type'] | undefined,
  teacher: Teacher | undefined,
  student: Student | undefined,
  pedagogue: Pedagogue | undefined,
) {
  if (type === 'professor') return teacher?.name
  if (type === 'aluno') return student?.name
  if (type === 'pedagogo') return pedagogue?.name

  return null
}

export function useGetFullUser() {
  const { data: currentUser } = useCurrentUserQuery()
  const { data: user } = useGetUserQuery(currentUser?.uid)
  const { data: teacher } = useGetTeacherQuery(user?.idTeacher)
  const { data: pedagogue } = useGetPedagogueQuery(user?.idPedagogue)
  const { data: student } = useGetStudentQuery(user?.idStudent)

  const type = user?.type
  const name = getName(type, teacher, student, pedagogue)

  return {
    currentUser,
    user,
    teacher,
    pedagogue,
    student,
    name,
  }
}
