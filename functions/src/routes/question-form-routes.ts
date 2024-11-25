import Router from 'express-promise-router'
import formController from '../controllers/question-form-controller'

const router = Router()

router.post('/perguntas', formController.questionForm)
router.put('/perguntas/:id', formController.uptadeQuestions)
router.delete('/perguntas/:id', formController.deleteQuestions)
export default router
