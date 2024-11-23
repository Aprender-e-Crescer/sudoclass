import { Request, Response } from 'express'
import { warningService } from '../services/warning.service'

const warningController = {
  createWarning: async (req: Request, res: Response): Promise<void> => {
    const { mensagem, id_materia, id_professor } = req.body
    try {
      const message = await warningService.createWarning(
        mensagem,
        id_materia,
        id_professor
      )
      res.status(201).send(message)
    } catch (err) {
      console.error('Erro criando aviso:', err)
      res.status(500).send('Erro ao criar o aviso.')
    }
  },

  updateWarning: async (req: Request, res: Response): Promise<void> => {
    const { mensagem } = req.body
    const id_aviso = parseInt(req.params.warningId, 10)
    if (isNaN(id_aviso)) {
      res.status(400).send('ID do aviso inválido.')
      return
    }

    try {
      const message = await warningService.updateWarning(id_aviso, mensagem)
      res.status(200).send(message)
    } catch (err) {
      console.error('Erro atualizando aviso:', err)
      res.status(500).send('Erro ao atualizar o aviso.')
    }
  },

  getWarning: async (req: Request, res: Response): Promise<void> => {
    const id_aviso = parseInt(req.params.warningId, 10)
    if (isNaN(id_aviso)) {
      res.status(400).send('ID do aviso inválido.')
      return
    }

    try {
      const warning = await warningService.getWarning(id_aviso)
      if (!warning) {
        res.status(404).send('Aviso não encontrado.')
      } else {
        res.status(200).json(warning)
      }
    } catch (err) {
      console.error('Erro buscando aviso:', err)
      res.status(500).send('Erro ao buscar o aviso.')
    }
  },

  deleteWarning: async (req: Request, res: Response): Promise<void> => {
    const id_aviso = parseInt(req.params.warningId, 10)
    if (isNaN(id_aviso)) {
      res.status(400).send('ID do aviso inválido.')
      return
    }

    try {
      const message = await warningService.deleteWarning(id_aviso)
      res.status(200).send(message)
    } catch (err) {
      console.error('Erro deletando aviso:', err)
      res.status(500).send('Erro ao deletar o aviso.')
    }
  },
}

export default warningController
