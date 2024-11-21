import Router from 'express-promise-router'; // Importação padrão
import  alunosController from '../controllers/alunos.controller';

const router = Router();

router.post('/alunos', alunosController.createAlunos);
router.put('/alunos/:id', alunosController.updateAlunos);

export default router; 