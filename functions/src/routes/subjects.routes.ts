import Router from 'express-promise-router';
import materiasController from '../controllers/subjects.controllers';

const router = Router();

router.post('/subject', materiasController.createMateria);
router.put('/subject/:id', materiasController.updateMateria);
router.delete('/subject/:id', materiasController.deleteMateria);
router.get('/subject/:id', materiasController.getMateriaById);

export default router;
