import { ChangeRequests } from "@/models/change-password-request-schema"
import { firestore } from "@/services/firebase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection } from "firebase/firestore"
import { LIST_CHANGE_PASSWORD_REQUESTS_QUERY_KEY } from '@/queries/use-change-password-request-query'  // Adjust this import based on your project structure

export function useCreateChangePasswordRequestMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createChangePasswordRequest'],
    mutationFn: (values: ChangeRequests) => addDoc(collection(firestore, 'studentPasswordChangeRequests'), values),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: LIST_CHANGE_PASSWORD_REQUESTS_QUERY_KEY })
    },
  })
}
