import { toast } from "@/hooks/use-toast";
import { useRegisterAdminMutation } from "@/mutations/use-admin-registration-mutation";
import { useDeletePedagoguesMutation } from "@/mutations/use-delete-admin-mutation";
import { useQueryClient } from "@tanstack/react-query";

export function useRegisterAdminController() {
    const queryClient = useQueryClient();

    const { mutateAsync: registerAdmin } = useRegisterAdminMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
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
        },
    });

    const { mutateAsync: deleteAdmin } = useDeletePedagoguesMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
            toast({
                title: "Sucesso!",
                duration: 2000,
                description: "O administrador foi deletado.",
                variant: "success",
            });
        },
        onError: () => {
            toast({
                duration: 2000,
                title: "Erro!",
                description: "Não foi possível deletar o administrador.",
                variant: "destructive",
            });
        },
    });

    return {
        registerAdmin,
        deleteAdmin,
    };
}
