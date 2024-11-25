import Router from 'express-promise-router'
import warningController from '../controllers/warning.controller'

const router = Router()

router.post('/warnings', warningController.createWarning)
router.put('/warnings/:warningId', warningController.updateWarning)
router.get('/warnings/:subjectId', warningController.getWarnings)
router.delete('/warnings/:warningId', warningController.deleteWarning)

export default router
