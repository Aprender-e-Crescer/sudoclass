import Router from 'express-promise-router';
import courseController from '../controllers/course.controller';

const router = Router();


router.post('/course', courseController.createCurso);
router.delete('/course/:id', courseController.deleteCourse);
router.put('/course/:id', courseController.updateCourse);
router.get('/course/:id?', courseController.listarCursos);
router.get('/course/:id/cursosAlunos', courseController.AlunosnoCurso)






export default router;