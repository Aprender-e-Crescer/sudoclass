import { useLoginMutation } from '@/mutations/use-login-mutation';

export function useLoginController() {
  const { LoginMutation, cpf, senha, isLoading, isError, data } = useLoginMutation();

  // Função para realizar o login
  const login = (values: { cpf: string; senha: string }) => {
    LoginMutation(values);
  };

  return {
    LoginMutation,
    cpf,
    senha,
    isLoading,
    isError,
    data,
  };
}
