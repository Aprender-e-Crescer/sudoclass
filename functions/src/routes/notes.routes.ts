import Router from 'express-promise-router'
import noteController from '../controllers/notes.controller'

const router = Router()

router.get('/note/get/:studentId', noteController.getNotesByStudentId)
router.get('/note/subject/:subjectId', noteController.getNotesBySubject)
router.get(
  '/note/subject/average/:subjectId',
  noteController.getAverageBySubject
)
router.get(
  '/note/student/:studentId/subject/:subjectId/average',
  noteController.getAverageByStudentAndSubject
)

export default router
