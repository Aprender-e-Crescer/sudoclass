import { Router } from 'express'
import warningController from '../controllers/warning.controller'

const router = Router()

router.post('/warnings', warningController.createWarning)
router.put('/warnings/:warningId', warningController.updateWarning)
router.get('/warnings/:warningId', warningController.getWarning)
router.delete('/warnings/:warningId', warningController.deleteWarning)

export default router
