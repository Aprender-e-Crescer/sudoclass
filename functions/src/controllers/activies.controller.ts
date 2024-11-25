import { Request, Response } from 'express'
import { activityService } from '../services/activity.service'

const activitiesController = {
  createActivity: async (req: Request, res: Response): Promise<void> => {
    const subjectId = parseInt(req.params.subjectId, 10)
    const { title, description, value, deliveryDate } = req.body

    if (!title || !description || !value || !deliveryDate) {
      res.status(400).send('Todos os campos são obrigatórios.')
      return
    }

    try {
      const ret = await activityService.createActivity(
        title,
        description,
        value,
        deliveryDate,
        subjectId
      )

      if (!ret) {
        res.status(500).send('Não foi possível cadastrar a atividade.')
      } else {
        res.status(201).send('Atividade cadastrada com sucesso.')
      }
    } catch (err) {
      console.error('Erro criando atividade:', err)
      res.status(500).send('Ocorreu um erro ao criar a atividade.')
    }
  },

  upgradeActivity: async (req: Request, res: Response): Promise<void> => {
    const { title, description, value, deliveryDate } = req.body
    const activityId = parseInt(req.params.activityId, 10)

    if (!title || !description || !value || !deliveryDate) {
      res.status(400).send('Todos os campos são obrigatórios.')
      return
    }
    try {
      const ret = await activityService.updateActivity(
        title,
        description,
        value,
        deliveryDate,
        activityId
      )
      if (!ret) {
        res.status(404).send('Atividade não encontrada.')
      } else {
        res.status(200).send('Atividade atualizada com sucesso.')
      }
    } catch (err) {
      console.error('Erro atualizando atividade:', err)
      res.status(500).send('Ocorreu um erro ao atualizar a atividade.')
    }
  },

  updateActivityGrades: async (req: Request, res: Response): Promise<void> => {
    const { grade, studentId } = req.body
    const activityId = parseInt(req.params.activityId, 10)

    if (!grade || isNaN(activityId) || isNaN(studentId)) {
      res.status(400).send('Parâmetros inválidos.')
      return
    }

    try {
      const ret = await activityService.updateActivityGrades(
        activityId,
        studentId,
        grade
      )

      if (!ret) {
        res.status(404).send('Atividade ou estudante não encontrado.')
      } else {
        res.status(200).send('Nota atualizada com sucesso.')
      }
    } catch (err) {
      console.error('Erro atualizando nota da atividade:', err)
      res.status(500).send('Erro ao atualizar a nota da atividade.')
    }
  },

  getActivityById: async (req: Request, res: Response): Promise<void> => {
    const activityId = parseInt(req.params.activityId, 10)

    if (isNaN(activityId)) {
      res.status(400).send('ID inválido.')
      return
    }

    try {
      const activity = await activityService.getActivityById(activityId)

      if (!activity) {
        res.status(404).send('Atividade não encontrada.')
      } else {
        res.status(200).json(activity)
      }
    } catch (err) {
      console.error('Erro buscando atividade:', err)
      res.status(500).send('Erro ao buscar a atividade.')
    }
  },

  deleteActivity: async (req: Request, res: Response): Promise<void> => {
    const activityId = parseInt(req.params.activityId, 10)

    if (isNaN(activityId)) {
      res.status(400).send('ID inválido.')
      return
    }

    try {
      const ret = await activityService.deleteActivity(activityId)

      if (!ret) {
        res.status(404).send('Atividade não encontrada.')
      } else {
        res.status(200).send('Atividade deletada com sucesso.')
      }
    } catch (err) {
      console.error('Erro deletando atividade:', err)
      res.status(500).send('Erro ao deletar a atividade.')
    }
  },

  getActivities: async (req: Request, res: Response): Promise<void> => {
    try {
      const activities = await activityService.getActivities()

      if (!activities || activities.length === 0) {
        res.status(404).send('Nenhuma atividade encontrada.')
      } else {
        res.status(200).json(activities)
      }
    } catch (err) {
      console.error('Erro buscando atividades:', err)
      res.status(500).send('Erro ao buscar as atividades.')
    }
  },
}

export default activitiesController
