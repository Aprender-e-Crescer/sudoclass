import { Request, Response } from 'express'
import { notaService } from '../services/notes.service'

const noteController = {
  getNotesByStudentId: async (req: Request, res: Response): Promise<void> => {
    const { studentId } = req.params
    try {
      const notes = await notaService.getNotesByStudentId(Number(studentId))

      if (typeof notes === 'string') {
        res.status(400).send(notes)
      } else {
        res.status(200).json(notes)
      }
    } catch (error) {
      console.error('Erro ao buscar notas do aluno:', error)
      res.status(500).send('Erro ao buscar as notas do aluno.')
    }
  },

  getAverageByStudentAndSubject: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const studentId = Number(req.params.studentId)
    const subjectId = Number(req.params.subjectId)

    try {
      const average = await notaService.getAverageByStudentAndSubject(
        studentId,
        subjectId
      )

      if (isNaN(average)) {
        res.status(404).send('Nenhuma nota encontrada para calcular a média.')
      } else {
        res.status(200).json({ average })
      }
    } catch (error) {
      console.error('Erro ao calcular a média do aluno para a matéria:', error)
      res.status(500).send('Erro ao calcular a média do aluno para a matéria.')
    }
  },

  getNotesBySubject: async (req: Request, res: Response): Promise<void> => {
    const { subjectId } = req.params
    try {
      const notes = await notaService.getNotesBySubject(Number(subjectId))

      if (notes.length === 0) {
        res.status(404).send('Nenhuma nota encontrada para esta matéria.')
      } else {
        res.status(200).json(notes)
      }
    } catch (error) {
      console.error('Erro ao buscar notas da matéria:', error)
      res.status(500).send('Erro ao buscar as notas da matéria.')
    }
  },

  getAverageBySubject: async (req: Request, res: Response): Promise<void> => {
    const subjectId = Number(req.params.subjectId)

    try {
      const average = await notaService.getAverageBySubject(subjectId)

      if (isNaN(average)) {
        res
          .status(404)
          .send('Nenhuma nota encontrada para calcular a média da matéria.')
      } else {
        res.status(200).json({ average })
      }
    } catch (error) {
      console.error('Erro ao calcular a média das notas da matéria:', error)
      res.status(500).send('Erro ao calcular a média das notas da matéria.')
    }
  },
}

export default noteController
