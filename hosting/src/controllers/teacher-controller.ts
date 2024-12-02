import { toast } from "@/hooks/use-toast";
import { useRegisterTeacherMutation } from "@/mutations/use-register-teacher-mutation";
import { useUpdateTeacherMutation } from "@/mutations/use-update-teacher-mutation";

export function useRegisterTeacherController() {
    const { mutateAsync: registerTeacher } = useRegisterTeacherMutation({
        onSuccess: () => {
            toast({
                title: "Sucesso!",
                duration: 2000,
                description: "O professor foi cadastrado.",
                variant: "sucesss",
            });
        },
        onError: () => {
            toast({
                duration: 2000,
                title: "Erro!",
                description: "Não foi possivel cadastrar o professor",
                variant: "destructive",
            });
        }
    })

    
    const { mutateAsync: updateTeacher } = useUpdateTeacherMutation({
        onSuccess: () => {
            toast({
                title: "Sucesso!",
                duration: 2000,
                description: "O professor foi atualizado.",
                variant: "sucesss",
            });
        },
        onError: () => {
            toast({
                duration: 2000,
                title: "Erro!",
                description: "Não foi possivel atualizar o professor",
                variant: "destructive",
            });
        }
    })
    return {
        registerTeacher,
        updateTeacher
    }
}