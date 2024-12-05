import { Request, Response } from 'express'
import { PresenceJustificationService } from '../services/presence-justification.service'

const justificationController = {
  createJustification: async (req: Request, res: Response): Promise<void> => {
    const { id_chamada, justificativa, image_url } = req.body

    if (!id_chamada || !justificativa) {
      res
        .status(400)
        .send('Os campos id_chamada e justificativa são obrigatórios.')
      return
    }

    try {
      const ret = await PresenceJustificationService.createJustification(
        id_chamada,
        justificativa,
        image_url
      )

      if (!ret) {
        res.status(500).send('Não foi possível criar a justificativa de falta.')
      } else {
        res.status(201).send(ret)
      }
    } catch (error) {
      console.error('Erro ao criar justificativa de falta:', error)
      res
        .status(500)
        .send(
          'Ocorreu um erro no servidor ao tentar criar a justificativa de falta.'
        )
    }
  },
  updateJustification: async (req: Request, res: Response): Promise<void> => {
    const { id_chamada, justificativa, image_url } = req.body
    const id = Number(req.params.id)

    try {
      const ret = await PresenceJustificationService.updateJustification(
        id,
        id_chamada,
        justificativa,
        image_url
      )

      if (ret === undefined) {
        res
          .status(500)
          .send('Não foi possível atualizar a justificativa de falta.')
      } else {
        res.status(200).send(ret)
      }
    } catch (error) {
      console.error('Erro ao atualizar justificativa de falta:', error)
      res
        .status(500)
        .send(
          'Ocorreu um erro no servidor ao tentar atualizar a justificativa de falta.'
        )
    }
  },

  deleteJustification: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)

    try {
      const ret = await PresenceJustificationService.deleteJustification(id)

      if (!ret) {
        res
          .status(500)
          .send('Não foi possível apagar a justificativa de falta.')
      } else {
        res.status(200).send('Justificativa de falta removida com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao apagar justificativa de falta:', error)
      res
        .status(500)
        .send(
          'Ocorreu um erro no servidor ao tentar remover a justificativa de falta.'
        )
    }
  },

  getJustificationById: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)

    try {
      const ret = await PresenceJustificationService.getJustificationById(id)

      if (!ret) {
        res.status(404).send('Justificativa de falta não encontrada.')
      } else {
        res.status(200).json(ret)
      }
    } catch (error) {
      console.error('Erro ao buscar justificativa de falta:', error)
      res
        .status(500)
        .send(
          'Ocorreu um erro no servidor ao tentar buscar a justificativa de falta.'
        )
    }
  },

  getAllJustifications: async (req: Request, res: Response): Promise<void> => {
    try {
      const ret = await PresenceJustificationService.getAllJustifications()

      if (!ret) {
        res
          .status(500)
          .send('Não foi possível buscar as justificativas de falta.')
      } else {
        res.status(200).json(ret)
      }
    } catch (error) {
      console.error('Erro ao buscar justificativas de falta:', error)
      res
        .status(500)
        .send(
          'Ocorreu um erro no servidor ao tentar buscar justificativas de falta.'
        )
    }
  },
}

export default justificationController
