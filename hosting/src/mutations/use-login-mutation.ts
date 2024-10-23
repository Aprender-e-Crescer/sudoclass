import { auth } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface LoginData {
  cpf?: string; // cpf é opcional para login anônimo
  password?: string; // password é opcional para login anônimo
}

interface LoginResponses {
  onSuccess: () => void;
  onError: (error: any) => void; // Passa o erro ao onError para tratamento
}

export function useLoginMutation({ onSuccess, onError }: LoginResponses) {
  return useMutation({
    mutationFn: async ({ cpf, password }: LoginData = {}) => { // Default para um objeto vazio
      try {
        if (cpf && password) {
          return await signInWithEmailAndPassword(auth, cpf, password);
        } else {
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
      // Aqui você pode verificar o tipo de erro e exibir mensagens apropriadas
      if (error.code) {
        console.error("Erro durante a autenticação:", error.message);
        // Por exemplo, você pode fazer um toast ou alert aqui
      }
    },
  });

  const handleLogin = async () => {
    try {
      // Passar um objeto vazio para login anônimo
      await login({}); // Para autenticação anônima, passa um objeto vazio
    } catch (error) {
      console.error("Erro durante o login", error);
    }
  };
}