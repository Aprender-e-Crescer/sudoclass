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

  getNotesByActivity: async (req: Request, res: Response): Promise<void> => {
    const activityId = Number(req.params.activityId)
    const studentId = Number(req.params.studentId)

    try {
      const notes = await notaService.getNotesByActivity(activityId, studentId)
      if (typeof notes === 'string') {
        res.status(400).send(notes) // Em caso de erro, envie um status 400
      } else {
        res.status(200).json(notes) // Se a requisição for bem-sucedida, envie as notas
      }
    } catch (error) {
      console.error('Erro ao buscar notas da atividade do aluno:', error)
      res.status(500).send('Erro ao buscar as notas da atividade do aluno.')
    }
  },

  getAverageByStudentAndSubject: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const subjectId = Number(req.params.subjectId)

    try {
      const averages = await notaService.getAverageByStudentAndSubject(
        subjectId
      )

      if (averages.length === 0) {
        res.status(404).send('Nenhuma nota encontrada para calcular a média.')
      } else {
        res.status(200).json(averages)
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

  getAverageForAllStudentsBySubject: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { subjectId } = req.params

    try {
      const averages = await notaService.getAverageByStudentAndSubject(
        Number(subjectId)
      )

      if (averages.length === 0) {
        res.status(404).send('Nenhum aluno encontrado para esta matéria.')
      } else {
        // Aqui ajustamos para retornar o array de médias de todos os alunos.
        res.status(200).json(averages)
      }
    } catch (error) {
      console.error('Erro ao buscar médias dos alunos para a matéria:', error)
      res
        .status(500)
        .send('Erro ao buscar as médias dos alunos para a matéria.')
    }
  },
}

export default noteController
