import Router from 'express-promise-router'
import justificationController from '../controllers/presence-justification.controller'

const router = Router()

router.post('/justificativa', justificationController.createJustification)
router.put('/justificativa/:id', justificationController.updateJustification)
router.delete('/justificativa/:id', justificationController.deleteJustification)
router.get('/justificativa/:id', justificationController.getJustificationById)
router.get('/justificativas', justificationController.getAllJustifications)

export default router
