import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firestore } from '@/services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updateLessonPlanSchema } from '@/models/update-lesson-plan-schema';
import { z } from 'zod';

export function useUpdateLessonPlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateLessonPlan'],
    mutationFn: async (values: z.infer<typeof updateLessonPlanSchema>) => {
      const { id, ...data } = values;
      const docRef = doc(firestore, 'lessonPlans', id);
      await updateDoc(docRef, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessonPlans'] });
    },
    onError: (error) => {
      console.error('Erro ao atualizar o plano de aula:', error);
    }
  });
}
