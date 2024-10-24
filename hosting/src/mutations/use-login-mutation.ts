import { auth } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { signInAnonymously } from "firebase/auth";
interface LoginResponses {
  onSuccess: () => void;
  onError: (error: any) => void;
}

export function useLoginMutation({ onSuccess, onError }: LoginResponses) {
  return useMutation({
    mutationFn: () => {
      return signInAnonymously(auth);
    },
    onSuccess,
    onError,
  });
}