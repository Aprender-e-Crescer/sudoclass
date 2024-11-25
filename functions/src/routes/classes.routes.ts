import Router from 'express-promise-router'
import turmasController from '../controllers/classes.controller'

const router = Router()

router.post('/classes', turmasController.createClass)
router.put('/classes', turmasController.updateClass)
router.delete('/classes', turmasController.deleteClass)
router.post('/classes/addAluno', turmasController.addStudentToClass)

export default router
