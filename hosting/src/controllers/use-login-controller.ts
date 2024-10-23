import { useMutation } from "@tanstack/react-query";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useNavigate } from "react-router-dom";

interface LoginData {
  cpf?: string; // CPF é opcional para login anônimo
  password?: string; // Senha é opcional para login anônimo
}

interface LoginResponses {
  onSuccess: () => void;
  onError: (error: any) => void; // Passa o erro ao onError para tratamento
}

export function useLoginMutation({ onSuccess, onError }: LoginResponses) {
  return useMutation({
    mutationFn: async ({ cpf, password }: LoginData = {}) => {
      try {
        if (cpf && password) {
          // Se CPF e senha forem fornecidos, faça login normal
          return await signInWithEmailAndPassword(auth, cpf, password);
        } else {
          // Senão, faça login anônimo
          return await signInAnonymously(auth);
        }
      } catch (error) {
        onError(error); // Passa o erro para a função onError
        throw error; // Lança o erro para ser tratado pela mutação
      }
    },
    onSuccess,
    onError,
  });
}

export function useLoginController() {
  const navigate = useNavigate();

  const { mutateAsync: login } = useLoginMutation({
    onSuccess: () => {
      navigate('/home'); // Navega para a página inicial após login
    },
    onError: (error) => {
      console.error("Erro durante a autenticação:", error.message);
      // Aqui você pode adicionar um toast ou mensagem para o usuário
    },
  });

  const handleLoginWithEmail = async (cpf: string, password: string) => {
    try {
      await login({ cpf, password }); // Faz o login com e-mail e senha
    } catch (error) {
      console.error("Erro durante o login com e-mail:", error);
    }
  };

  const handleLoginAnonymously = async () => {
    try {
      await login({}); // Faz o login anônimo
    } catch (error) {
      console.error("Erro durante o login anônimo:", error);
    }
  };

  return { handleLoginWithEmail, handleLoginAnonymously };
}
