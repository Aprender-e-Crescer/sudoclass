import { Request, Response } from 'express'
import { schoolCallService } from '../services/school-call.service'

const schoolCallController = {
  createSchoolCall: async (req: Request, res: Response): Promise<void> => {
    const { id_aluno, status, id_chamada, id_materia, data } = req.body
    try {
      const retorno = await schoolCallService.createSchoolCall(
        id_chamada,
        id_materia,
        data,
        id_aluno,
        status
      )
      if (!retorno) {
        res.status(500).send('Não foi possível criar a chamada.')
      } else {
        res.status(201).send(retorno)
      }
    } catch (error) {
      console.error('Erro ao criar a chamada:', error)
      res.status(500).send('Erro interno do servidor ao criar a chamada.')
    }
  },

  updateSchoolCall: async (req: Request, res: Response): Promise<void> => {
    const { status } = req.body
    const id_aluno = Number(req.params.id)
    try {
      const ret = await schoolCallService.updateSchoolCall(id_aluno, status)
      if (!ret) {
        res.status(404).send('Chamada não encontrada para atualização.')
      } else {
        res.status(200).send('Chamada atualizada com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao atualizar a chamada:', error)
      res.status(500).send('Erro interno do servidor ao atualizar a chamada.')
    }
  },

  deleteSchoolCall: async (req: Request, res: Response): Promise<void> => {
    const id_chamada = Number(req.params.id)
    try {
      const ret = await schoolCallService.removeSchoolCall(id_chamada)
      if (!ret) {
        res.status(404).send('Chamada não encontrada para remoção.')
      } else {
        res.status(200).send('Chamada removida com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao remover a chamada:', error)
      res.status(500).send('Erro interno do servidor ao remover a chamada.')
    }
  },

  getSchoolCall: async (req: Request, res: Response): Promise<void> => {
    const id_chamada = Number(req.params.id)
    try {
      const ret = await schoolCallService.getSchoolCallById(id_chamada)
      if (!ret) {
        res.status(404).send('Chamada não encontrada.')
      } else {
        res.status(200).json(ret)
      }
    } catch (error) {
      console.error('Erro ao buscar a chamada:', error)
      res.status(500).send('Erro interno do servidor ao buscar a chamada.')
    }
  },

  getSchoolCallBySubject: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id_materia = Number(req.params.id)
    try {
      const ret = await schoolCallService.getSchoolCallBySubject(id_materia)
      if (!ret) {
        res.status(404).send('Chamada não encontrada.')
      } else {
        res.status(200).json(ret)
      }
    } catch (error) {
      console.error('Erro ao buscar a chamada:', error)
      res.status(500).send('Erro interno do servidor ao buscar a chamada.')
    }
  },

  getSchoolCallByClass: async (req: Request, res: Response): Promise<void> => {
    const id_turma = Number(req.params.id)
    try {
      const ret = await schoolCallService.getSchoolCallByClass(id_turma)
      if (!ret) {
        res.status(404).send('Chamada não encontrada.')
      } else {
        res.status(200).json(ret)
      }
    } catch (error) {
      console.error('Erro ao buscar a chamada:', error)
      res.status(500).send('Erro interno do servidor ao buscar a chamada.')
    }
  },
}

export default schoolCallController
