import { toast } from "@/hooks/use-toast";
import { useRegisterStudentMutation } from "@/mutations/use-register-student-mutation";
import { useUpdateStudentMutation } from "@/mutations/use-update-student-mutation";

export function useRegisterStudentController() {
    const { mutateAsync: registerStudent } = useRegisterStudentMutation({
        onSuccess: () => {
            toast({
                title: "Sucesso!",
                duration: 2000,
                description: "O estudante foi cadastrado.",
                variant: "success",
            });
        },
        onError: () => {
            toast({
                duration: 2000,
                title: "Erro!",
                description: "Não foi possível cadastrar o estudante.",
                variant: "destructive",
            });
        }
    });

    const { mutateAsync: updateStudent } = useUpdateStudentMutation({
        onSuccess: () => {
            toast({
                title: "Sucesso!",
                duration: 2000,
                description: "O estudante foi atualizado.",
                variant: "success",
            });
        },
        onError: () => {
            toast({
                duration: 2000,
                title: "Erro!",
                description: "Não foi possível atualizar o estudante.",
                variant: "destructive",
            });
        }
    });

    return {
        registerStudent,
        updateStudent,
    };
}
