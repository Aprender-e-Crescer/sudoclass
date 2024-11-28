import Router from 'express-promise-router'
import turmasController from '../controllers/classes.controller'

const router = Router()

router.post('/turmas', turmasController.createClass)

router.put('/turmas/:id', turmasController.updateClass)

router.delete('/turmas/:id', turmasController.deleteClass)

router.post('/turmas/:id/adicionarAlunos', turmasController.addStudentsToClass)

router.get('/turmas/:id/listarAlunos', turmasController.liststudentsinClass)
router.get('/turmas/:id_turma/listar-materias', turmasController.listSubjectsInClass);
router.get('/turmas/:id', turmasController.getClassesbyid);

export default router
