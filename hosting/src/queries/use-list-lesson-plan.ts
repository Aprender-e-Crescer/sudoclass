import { useQuery } from '@tanstack/react-query';
import { lessonPlanSchema, LessonPlan } from '@/models/lesson-plan';
import { api } from '@/services/api';
export function useListLessonPlan() {
  return useQuery<LessonPlan[]>({
    queryKey: ['planoaula'],
    queryFn: async () => {
      const { data } = await api.get('/lessonPlans');
      console.log(data);
      return data.map((lessonPlan: any) => lessonPlanSchema.parse(lessonPlan));
    },
  });
}
