import { UpdateLessonPlan } from '@/models/update-lesson-plan-schema';

export const useUpdateLessonPlan = async (values: UpdateLessonPlan) => {
  // Aqui você faria a chamada para uma API, por exemplo:
  // await api.put('/update-lesson', values);

  console.log('Atualizando plano de aula:', values);
};
