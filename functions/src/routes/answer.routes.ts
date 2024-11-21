import { AnswerController } from "../controllers/answer.controller";
import { AnswerService } from "../services/answer.service";
import Router from 'express-promise-router';

const answerService = new AnswerService();
const answerController = new AnswerController(answerService);

const router = Router();

router.post('/answers', answerController.createAnswer);
router.get('/answers/student/:studentId', answerController.searchAnswerByStudent);
router.get('/answers', answerController.getAllAnswers);
router.put('/answers/:id', answerController.updateAnswer);
router.delete('/answers/:id', answerController.deleteAnswer);

export default router; 
