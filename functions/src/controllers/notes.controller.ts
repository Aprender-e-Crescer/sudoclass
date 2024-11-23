import { Request, Response } from 'express'
import { notaService } from '../services/notes.service'

const noteController = {
  getNote: async (req: Request, res: Response): Promise<void> => {
    const { studentId } = req.params
    try {
      const nota = await notaService.getNotesByStudentId(Number(studentId))
      if (!nota) {
        res.status(404).send('Nota não encontrada.')
      } else {
        res.status(200).json(nota)
      }
    } catch (error) {
      console.error('Erro ao buscar nota:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar buscar a nota.')
    }
  },

  getAverage: async (req: Request, res: Response): Promise<void> => {
    const studentId = Number(req.params.studentId)

    try {
      const average = await notaService.getAverageByStudentId(studentId)

      if (average === null) {
        res.status(404).send('Nenhuma nota encontrada para calcular a média.')
      } else {
        res.status(200).json({ average })
      }
    } catch (error) {
      console.error('Erro ao calcular a média das notas:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar calcular a média.')
    }
  },
}

export default noteController
