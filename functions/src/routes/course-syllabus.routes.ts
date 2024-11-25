import Router from 'express-promise-router';
import courseSyllabusController from '../controllers/course-syllabus.controller';

const router = Router();

router.get('/Syllabus/:courseId/:subjectId', courseSyllabusController.getSyllabus);
router.post('/Syllabus', courseSyllabusController.createSyllabus);
router.put('/Syllabus/:courseId/:subjectId', courseSyllabusController.updateSyllabus);
router.delete('/Syllabus/:courseId/:subjectId', courseSyllabusController.deleteSyllabus);

export default router;
