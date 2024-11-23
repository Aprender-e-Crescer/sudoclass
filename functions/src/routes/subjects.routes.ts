import Router from 'express-promise-router';
import subjectsController from '../controllers/subjects.controllers';

const router = Router();

router.post('/subject', subjectsController.createSubject);
router.put('/subject/:idMateria/course/:idCurso/teacher/:idProfessor',subjectsController.updateSubject);
router.delete('/subject/:id', subjectsController.deleteSubject);
router.get('/subject/:id', subjectsController.getSubjectById);
router.post('/subject/class/:idTurma', subjectsController.addSubjectToClass);


export default router;
