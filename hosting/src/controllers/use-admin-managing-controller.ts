import { useToast } from "@/hooks/use-toast"
import { useCreateAdmin } from "@/mutations/use-create-admin"
import { useUpdateAdmin } from "@/mutations/use-update-admin"
import { useNavigate } from "@tanstack/react-router"

export function useAdminManagingController() {
    const navigate = useNavigate()

    const { toast } = useToast()

    const { mutateAsync: createAdmin } = useCreateAdmin({
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

    const { mutateAsync: updateAdmin } = useUpdateAdmin({
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
        updateAdmin,
        createAdmin,

    }
}