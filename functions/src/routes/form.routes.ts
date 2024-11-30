import Router from 'express-promise-router' // Importação padrão
import formController from '../controllers/form.controller'

const router = Router()

router.post('/formularios', formController.createForm)
router.put('/formularios/:id', formController.updateForm)
router.delete('/formularios/:id', formController.deleteForm)
router.get('/formularios/:id', formController.getFormById)
router.get('/formularios', formController.getAllForms)

export default router
