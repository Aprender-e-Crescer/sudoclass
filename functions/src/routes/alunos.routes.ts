import Router from 'express-promise-router' // Importação padrão
import alunosController from '../controllers/alunos.controller'

const router = Router()

router.post('/alunos', alunosController.createAlunos)
router.put('/alunos/:id', alunosController.updateAlunos)
router.get('/alunos/:id', alunosController.getStudent)
router.delete('/alunos/:id', alunosController.deleteStudent)
router.get('/alunos', alunosController.getAllStudent)
router.get('/alunos/documents/:id', alunosController.getDocStudent)
router.get("/alunos/nota/:id_turma", alunosController.getnoteStudent);

export default router
