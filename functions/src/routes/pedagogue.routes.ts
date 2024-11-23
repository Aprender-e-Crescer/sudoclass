import Router from 'express-promise-router';
import pedagogosController from '../controllers/pedagogue.controller';

const router = Router();

router.post('/pedagogos', pedagogosController.createPedagogue);
router.put('/pedagogos/:id', pedagogosController.updatePedagogue);
router.delete('/pedagogos/:id', pedagogosController.deletePedagogue);
router.get('/pedagogos/:id', pedagogosController.getPedagogue);

export default router;
