// use-list-lesson-plan.ts
import { useQuery } from '@tanstack/react-query';
import { lessonPlanSchema, LessonPlan } from '@/models/lesson-plan';
import { api } from '@/services/api';

export function useListLessonPlan(id: string) {
  return useQuery<LessonPlan[]>({
    queryKey: ['lessonPlans', id],
    queryFn: async () => {
      const { data } = await api.get(`/alunos/${id}`); 
      const lessonPlans = data.map((lessonPlan: any) => lessonPlanSchema.parse(lessonPlan));
      return lessonPlans;
    },
  });
}
