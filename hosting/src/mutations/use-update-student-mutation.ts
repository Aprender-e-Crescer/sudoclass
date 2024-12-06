import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface UpdateStudentPayload {
  nomeCompleto: string;
  attachDocuments: string;
  estadoDeNascimento: string;
  cidadeDeNascimento: string;
  estado: string;
  municipio: string;
  rua: string;
  bairro: string;
  numero: string;
  dataDeNascimento: string;
  dataExpedicaoRg: string;
  estadodeexpedicaorg: string;
  cpf: string;
  rg: string;
  id: string;
  responsible: string;
}

interface MutationResults {
  onSuccess: () => void;
  onError: () => void;
}

interface MutationParams {
  id: string;
  values: UpdateStudentPayload;
}

export function useUpdateStudentMutation({ onSuccess, onError }: MutationResults) {
  return useMutation({
    mutationKey: ['update-teacher'],
    mutationFn: ({ id, values }: MutationParams) => 
      api.put(`/alunos/${id}`, {
        nomeCompleto: values.nomeCompleto,
        attachDocuments: values.attachDocuments,
        estadoDeNascimento: values.estadoDeNascimento,
        cidadeDeNascimento: values.cidadeDeNascimento,
        estado: values.estado,
        municipio: values.municipio,
        rua: values.rua,
        bairro: values.bairro,
        numero: values.numero,
        dataDeNascimento: values.dataDeNascimento,
        dataExpedicaoRg: values.dataExpedicaoRg,
        estadodeexpedicaorg: values.estadodeexpedicaorg,
        cpf: values.cpf,
        rg: values.rg,
        id: values.id,
        responsible: values.responsible,
      }),
    onSuccess,
    onError,
  })
}
