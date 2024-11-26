import { useCurrentUserQuery } from "@/queries/use-current-user-query"
import { useGetPedagogueQuery } from "@/queries/use-get-pedagogue-query"
import { useGetStudentQuery } from "@/queries/use-get-student-query"
import { useGetTeacherQuery } from "@/queries/use-get-teacher-query"
import { useGetUserQuery } from "@/queries/use-get-user-query"

export function useGetFullUser() {
    const { data: currentUser } = useCurrentUserQuery()
    const { data: user } = useGetUserQuery(currentUser?.uid)
    const { data: teacher } = useGetTeacherQuery(user?.idTeacher)
    const { data: pedagogue } = useGetPedagogueQuery(user?.idPedagogue)
    const { data: student } = useGetStudentQuery(user?.idStudent)

    return {
        currentUser,
        user,
        teacher,
        pedagogue,
        student,
    }
}