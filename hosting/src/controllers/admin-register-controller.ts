import { toast } from "@/hooks/use-toast";
import { useRegisterAdminMutation } from "@/mutations/use-admin-registration-mutation";

export function useRegisterAdminController() {
    const { mutateAsync: registerAdmin } = useRegisterAdminMutation({
        onSuccess: () => {
            toast({
                title: "Sucesso!",
                duration: 2000,
                description: "O administrador foi cadastrado.",
                variant: "success",
            });
        },
        onError: () => {
            toast({
                duration: 2000,
                title: "Erro!",
                description: "Não foi possível cadastrar o administrador.",
                variant: "destructive",
            });
        }
    });
    return {
        registerAdmin
    };
}
