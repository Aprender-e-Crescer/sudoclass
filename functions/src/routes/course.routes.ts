import Router from 'express-promise-router';
import courseController from '../controllers/course.controller';

const router = Router();


router.post('/courso', courseController.createCurso);
router.delete('/courso/:id', courseController.deleteCourse);
router.put('/courso/:id', courseController.updateCourse);
router.get('/courso/:id', courseController.getCourseById);
router.post('/curso/materia/:idCurso/:idMateria', courseController.addSubjectToCurso);





export default router;