import { Request, Response } from 'express'
import { questionService } from '../services/question-form-service'

const formController = {
  questionForm: async (req: Request, res: Response): Promise<void> => {
    const { description, displayOrder, tipeAnswer } = req.body
    const formId = req.params.formId
    try {
      const ret = await questionService.createQuestion(
        description,
        displayOrder,
        tipeAnswer,
        formId
      )
      if (!ret) {
        res.status(500).send('Não foi possível cadastrar a pergunta.')
      } else {
        res.status(200).send('Pergunta cadastrada com sucesso')
      }
    } catch (error) {
      console.error('Erro ao cadastrar pergunta:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar cadastrar a pergunta.')
    }
  },

  uptadeQuestions: async (req: Request, res: Response): Promise<void> => {
    const { description, displayOrder, tipeAnswer } = req.body
    const { id, formId } = req.params

    if (!description || !displayOrder || tipeAnswer || id || !formId) {
      res.status(400).send('Os atributos são obrigatórios para o update')
      return
    }

    try {
      const ret = await questionService.uptadeQuestion(
        description,
        id,
        displayOrder,
        tipeAnswer,
        formId
      )
      if (!ret) {
        res.status(500).send('Não foi possível atualizar o pergunta.')
      } else {
        res.status(200).send('Atualização realizada com sucesso')
      }
    } catch (error) {
      console.error('Erro ao atualizar pergunta', error)
      res.status(500).send('Ocorreu um erro ao tentar atualizar a pergunta')
    }
  },
  deleteQuestions: async (req: Request, res: Response): Promise<void> => {
    const { id, formId } = req.params
    try {
      const ret = await questionService.deleteQuestion(id, formId)
      if (!ret) {
        res.status(500).send(`Náo foi possivel deletar a pergunta`)
      } else {
        res
          .status(200)
          .send(
            `Pergunta com id ${id} deletada com sucesso no formulario com id ${formId}`
          )
      }
    } catch (error) {
      console.error(`Erro ao deletar pergunta`, error)
      res.status(500).send(`Ocorreu um erro ao tentar deletar a pergunta`)
    }
  },
}

export default formController
