import { useToast } from "@/hooks/use-toast"
import { useCreateTeacherMutation } from "@/mutations/use-create-teacher-mutation"
import { useUpdateTeacherMutation } from "@/mutations/use-update-teacher-mutation"
import { getUserQueryOptions } from "@/queries/use-get-user-query"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export function useTeacherManagingController(id: string | undefined) {
    const navigate = useNavigate()

    const { data: user } = useQuery(getUserQueryOptions(id))

    const { toast } = useToast()

    const { mutateAsync: createTeacher } = useCreateTeacherMutation({
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Erro ao criar admin",
                description: error.message,
            })
        },
        onSuccess: () => {
                navigate({
                to: "/users"
            })
        }
    })

    const { mutateAsync: updateTeacher } = useUpdateTeacherMutation({
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Erro ao atualizar admin",
                description: error.message,
            })
        },
        onSuccess: () => {
            navigate({
                to: "/users"
            })
        }
    })

    return {
        updateTeacher,
        createTeacher,
        user,
    }
}