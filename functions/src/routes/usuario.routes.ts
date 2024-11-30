import Router from 'express-promise-router';
import usuarioController from '../controllers/usuario.controller'

export const router = Router();

router.post('/usuario', usuarioController.CreateUser); 
router.put('/usuario/:id_usuario', usuarioController.updateUser);
router.get('/usuario/:id_usuario', usuarioController.getUser);
router.delete('/usuario/:id_usuario', usuarioController.deleteUser); 

export default router;