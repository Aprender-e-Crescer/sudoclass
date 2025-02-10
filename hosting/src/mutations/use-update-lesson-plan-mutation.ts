import { useMutation } from '@tanstack/react-query';
import { firestore } from '@/services/firebase';
import { doc, updateDoc } from 'firebase/firestore';


interface MutationResults {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

interface LessonPlanUpdate {
  id: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  trainingContent: string;
  teachingMethodology: string;
  teachingResources: string;
}

export function useUpdateLessonPlanMutation({ onSuccess, onError }: MutationResults) {
  return useMutation({
    mutationKey: ['update-lesson-plan'],
    mutationFn: (values: LessonPlanUpdate) => {
      const parsedValues = updateLessonPlanSchema.parse(values);
      const lessonPlanDocRef = doc(firestore, 'lessonPlans', parsedValues.id);

      return updateDoc(lessonPlanDocRef, {
        date: parsedValues.date,
        timeStart: parsedValues.timeStart,
        timeEnd: parsedValues.timeEnd,
        trainingContent: parsedValues.trainingContent,
        teachingMethodology: parsedValues.teachingMethodology,
        teachingResources: parsedValues.teachingResources,
      });
    },
    onSuccess,
    onError,
  });
}
