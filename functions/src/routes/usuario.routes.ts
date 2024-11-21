import Router from 'express-promise-router';
import usuarioController from '../controllers/usuario.controller'

const router = Router();

router.post('/usuario', usuarioController.CreateUser);
router.put('/usuario/:id', usuarioController.updateUser);
router.get('/usuario/:id', usuarioController.getUser);
router.delete('/usuario/:id', usuarioController.deleteUser); 
