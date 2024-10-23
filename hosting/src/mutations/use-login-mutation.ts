import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Hook para fazer a mutation de login
export function useLoginMutation() {
  return useMutation(async (loginData: { cpf: string; senha: string }) => {
    const response = await axios.post('/api/login', loginData);
    return response.data;
  });
}
