import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firestore } from '@/services/firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { z } from 'zod';
import { updateLessonPlanSchema } from '@/models/update-lesson-plan-schema';
export function useUpdateLessonPlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateLessonPlan'],
    mutationFn: async (values: z.infer<typeof updateLessonPlanSchema>) => {
      // Verificando se o 'id' foi passado corretamente
      if (!values.id) {
        throw new Error("O ID do plano de aula é obrigatório para a atualização.");
      }

      // Acessando o documento específico que será atualizado
      const docRef = doc(firestore, 'lessonPlans', values.id);

      // Atualizando o documento com os valores recebidos
      await updateDoc(docRef, {
        data: values.data,
        horaInicio: values.horaInicio,
        horaFim: values.horaFim,
        conteudoFormativo: values.conteudoFormativo,
        metodologiaDeEnsino: values.metodologiaDeEnsino,
        recursosDidaticos: values.recursosDidaticos,
      });

      return docRef; // Retorna a referência do documento atualizado
    },
    onSuccess: () => {
      // Invalida as queries para que os dados sejam recarregados após o update
      queryClient.invalidateQueries({ queryKey: ['lessonPlans'] });
    },
    onError: (error) => {
      console.error('Erro ao atualizar o plano de aula:', error);
    },
  });
}
