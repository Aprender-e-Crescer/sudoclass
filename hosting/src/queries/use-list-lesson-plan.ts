import { LessonPlan, lessonPlanSchema } from '@/models/lesson-plan-schema';
import { firestore } from '@/services/firebase';
import { queryOptions } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const getLessonPlansFirestoreQuery = (
  idCourse: string,
  idClass: string,
  idSubject: string
) =>
  collection(
    firestore,
    'courses',
    idCourse,
    'classes',
    idClass,
    'subjects',
    idSubject,
    'lessonPlannings'
  ).withConverter({
    fromFirestore: snapshot => lessonPlanSchema.parse({ id: snapshot.id, ...snapshot.data() }),  // Conversão com Zod
    toFirestore: (lessonPlan: LessonPlan) => lessonPlan,  // Definição de como salvar
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
      return lessonPlansSnapshot.docs.map(doc => doc.data());  // Retorna os dados já convertidos e tipados
    },
  });
