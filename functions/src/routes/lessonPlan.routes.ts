import Router from 'express-promise-router';
import LessonPlanController from '../controllers/lessonPlan.controller';

const router = Router();
router.post('/lessonPlan', LessonPlanController.createLessonPlan);
router.put('/lessonPlan/:id', LessonPlanController.updateLessonPlan);
router.delete('/lessonPlan/:id', LessonPlanController.deleteLessonPlan);
router.get('/lessonPlan/:id', LessonPlanController.getLessonPlan);

export default router;