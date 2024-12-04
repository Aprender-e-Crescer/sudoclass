import { useQuery } from '@tanstack/react-query';
import { lessonPlanSchema, LessonPlan } from '@/models/lesson-plan';
import { api } from '@/services/api';
import { z } from 'zod';
import { LESSON_PLAN_QUERY_KEY } from '@/constants/queries';
export function useListLessonPlan() {
  return useQuery<LessonPlan[]>({
    queryKey: LESSON_PLAN_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get('/lessonPlans');
      console.log(data);
      return z.array(lessonPlanSchema).parse(data);
    },
  });
}
