import Router from 'express-promise-router'
import activiesController from '../controllers/activies.controller'

const router = Router()

router.post('/:subjectId/activity', activiesController.createActivity)
router.patch(
  '/activity/:activityId/:studentId',
  activiesController.updateActivityGrades
)
router.get('/activity/:activityId', activiesController.getActivityById)
router.get('/activity', activiesController.getActivities)
router.delete('/activity/:activityId', activiesController.deleteActivity)

export default router
