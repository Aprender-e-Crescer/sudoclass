import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { LESSON_PLAN_QUERY_KEY } from '@/constants/queries';

export interface LessonPlanUpdate {
  id_planoaula: string;
  id_professor: string;
  id_turma: string;
  id_materia: string;
  data_aula: string;
  inicio_aula: string;
  fim_aula: string;
  conteudoformativo: string;
  mododeensino: string;
  recursosdidaticos: string;
}

export function useUpdateLessonPlanMutation(
  onSuccessCallback: { onSuccess: () => void },
  onErrorCallback: { onSuccess: () => void; onError: (err: any) => void },
  onError: (err: any) => void
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['updateLessonPlan'],
    mutationFn: async ({
      id_planoaula,
      id_professor,
      id_turma,
      id_materia,
      data_aula,
      inicio_aula,
      fim_aula,
      conteudoformativo,
      mododeensino,
      recursosdidaticos,
    }: LessonPlanUpdate) => {
      const requestBody = {
        id_professor,
        id_turma,
        id_materia,
        data_aula,
        inicio_aula,
        fim_aula,
        conteudoformativo,
        mododeensino,
        recursosdidaticos,
      };
      const res = await api.put(`/lessonPlan/${id_planoaula}`, requestBody);
      console.log('Resposta da API:', res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LESSON_PLAN_QUERY_KEY });
      onSuccessCallback.onSuccess();
    },
    onError: (error) => {
      console.error('Erro ao atualizar o plano de aula:', error);
      onErrorCallback.onError(error);
    },
  });

  return mutation;
}
