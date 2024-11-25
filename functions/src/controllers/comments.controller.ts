import { Request, Response } from 'express'
import { commentService } from '../services/comments.service'
const commentController = {
  createComment: async (req: Request, res: Response): Promise<void> => {
    const { userId, activityId, message } = req.body
    try {
      const ret = await commentService.createComment(
        userId,
        activityId,
        message
      )
      res.status(200).send(ret)
    } catch (err) {
      console.error('Erro criando comentário:', err)
      res.status(500).send('Erro ao criar comentário.')
    }
  },

  getComments: async (req: Request, res: Response): Promise<void> => {
    const activityId = parseInt(req.params.activityId, 10)
    try {
      const comments = await commentService.getComments(activityId)
      if (
        !comments ||
        comments === 'Nenhum comentário encontrado para essa atividade.'
      ) {
        res.status(404).send('Nenhum comentário encontrado.')
      } else {
        res.status(200).send(comments)
      }
    } catch (err) {
      console.error('Erro buscando comentários:', err)
      res.status(500).send('Erro ao buscar comentários.')
    }
  },

  updateComment: async (req: Request, res: Response): Promise<void> => {
    const { newMessage } = req.body
    const commentId = parseInt(req.params.commentId, 10)
    try {
      const ret = await commentService.updateComment(commentId, newMessage)
      res.status(200).send(ret)
    } catch (err) {
      console.error('Erro atualizando comentário:', err)
      res.status(500).send('Erro ao atualizar comentário.')
    }
  },

  deleteComment: async (req: Request, res: Response): Promise<void> => {
    const commentId = parseInt(req.params.commentId, 10)
    try {
      const ret = await commentService.deleteComment(commentId)
      res.status(200).send(ret)
    } catch (err) {
      console.error('Erro deletando comentário:', err)
      res.status(500).send('Erro ao excluir comentário.')
    }
  },
}

export default commentController
