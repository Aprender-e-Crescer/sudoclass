import Router from 'express-promise-router';
import { responsibleController } from '../controllers/responsible.controller';

const router = Router();

router.post('/responsavel', responsibleController.createResponsible);
router.put('/responsavel/:id', responsibleController.updateResponsible);
router.delete('/responsavel/:id', responsibleController.deleteResponsible);
router.get('/responsavel/:id', responsibleController.getResponsible);

export default router;
