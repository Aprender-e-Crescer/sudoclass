import { LessonPlan, lessonPlanSchema } from '@/models/lesson-plan-schema';
import { firestore } from '@/services/firebase';
import { queryOptions } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const getLessonPlansFirestoreQuery = (
  idCourse: string,
  idClass: string,
  idSubject: string
) =>
  query(
    collection(
      firestore,
      'courses',
      idCourse,
      'classes',
      idClass,
      'subjects',
      idSubject,
      'lessonPlannings'
    ),
    orderBy('startDate', 'desc')
  ).withConverter({
    fromFirestore: snapshot => lessonPlanSchema.parse({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (lessonPlan: LessonPlan) => lessonPlan,
  });

export const getLessonPlansQueryOptions = (
  idCourse: string,
  idClass: string,
  idSubject: string
) =>
  queryOptions({
    queryKey: ['listLessonPlannings', idCourse, idClass, idSubject],
    queryFn: async () => {
      const lessonPlanningsRef = getLessonPlansFirestoreQuery(idCourse, idClass, idSubject);
      const lessonPlansSnapshot = await getDocs(lessonPlanningsRef);
      return lessonPlansSnapshot.docs.map(doc => doc.data());
    },
  });
