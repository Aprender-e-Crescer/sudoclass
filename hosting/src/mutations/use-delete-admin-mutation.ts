import { PEDAGOGUES_QUERY_KEY } from "@/queries/use-list-admin-query";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Results {
  onSuccess: () => void;
  onError: () => void;
}

export function useDeletePedagoguesMutation({ onSuccess, onError }: Results) {
  const queryClient = useQueryClient(); // Aqui está a correção

  return useMutation({
    mutationKey: ["delete-pedagogues"],
    mutationFn: (id: number) => api.delete(`/pedagogos/${id}`),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: PEDAGOGUES_QUERY_KEY });
    },
    onError,
  });
}
