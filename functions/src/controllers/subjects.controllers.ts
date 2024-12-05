import { Request, Response } from 'express'
import { materiaService } from '../services/subjects.service'

const subjectsController = {
  createSubject: async (req: Request, res: Response): Promise<void> => {
    const {
      nomeMateria,
      cargaHoraria,
      dataInicio,
      dataFim,
      idProfessor,
      ementa,
    } = req.body

    try {
      const retorno = await materiaService.createSubject(
        nomeMateria,
        cargaHoraria,
        dataInicio,
        dataFim,
        idProfessor,
        ementa
      )
      res.status(200).send(retorno)
    } catch (error) {
      console.error('Erro ao cadastrar materia:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar cadastrar a materia.')
    }
  },

  updateSubject: async (req: Request, res: Response): Promise<void> => {
    const { idMateria, idCurso, idProfessor } = req.params

    const { nomeMateria, cargaHoraria, dataInicio, dataFim, ementa } = req.body

    try {
      const ret = await materiaService.updateSubject(
        idMateria,
        idCurso,
        nomeMateria,
        cargaHoraria,
        dataInicio,
        dataFim,
        idProfessor,
        ementa
      )

      if (!ret) {
        res.status(500).send('Nao foi possivel atualizar a materia.')
      } else {
        res.status(200).send(ret)
      }
    } catch (error) {
      console.error('Erro ao atualizar materia:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar atualizar a materia.')
    }
  },

  deleteSubject: async (req: Request, res: Response): Promise<void> => {
    const idMateria = req.params.id

    if (!idMateria) {
      res.status(400).send('ID da materia e obrigatorio.')
      return
    }

    try {
      const ret = await materiaService.deleteSubject(idMateria)
      if (!ret) {
        res.status(500).send('Nao foi possivel deletar a materia.')
      } else {
        res.status(200).send('Materia deletada com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao deletar materia:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar deletar a materia.')
    }
  },

  getSubjectById: async (req: Request, res: Response): Promise<void> => {
    const idMateria = req.params.id

    if (!idMateria) {
      res.status(400).send('ID da materia e obrigatorio.')
      return
    }

    try {
      const ret = await materiaService.getSubjectById(idMateria)
      if (!ret) {
        res.status(404).send('Materia nao encontrada.')
      } else {
        res.status(200).send(ret)
      }
    } catch (error) {
      console.error('Erro ao buscar materia:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar buscar a materia.')
    }
  },
  addSubjectToClass: async (req: Request, res: Response): Promise<void> => {
    const { idMateria } = req.body
    const { idTurma } = req.params
    try {
      await materiaService.addSubjectToClass(idTurma, idMateria)
      res
        .status(200)
        .send(
          `Materia com ID ${idMateria} adicionada a turma com ID ${idTurma} com sucesso.`
        )
    } catch (error) {
      console.error('Erro ao adicionar materia a turma:', error)
      res
        .status(500)
        .send(
          'Ocorreu um erro no servidor ao tentar adicionar a materia a turma.'
        )
    }
  },
  studentListBySubject: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    if (!id) {
      res.status(400).send('ID da materia e obrigatorio.')
      return
    }

    try {
      const resposta = await materiaService.studentListBySubject(id)
      if (!resposta) {
        res.status(404).send('Nenhum aluno encontrado para esta materia.')
      } else {
        res.status(200).send(resposta)
      }
    } catch (error) {
      console.error('Erro ao buscar alunos por materia:', error)
      res.status(500).send('Ocorreu um erro')
    }
  },
  getAllSubjects: async (req: Request, res: Response): Promise<void> => {
    try {
      const resposta = await materiaService.getallsubject()
      res.status(200).send(resposta)
    } catch (error) {
      console.error('Erro ao buscar todas as materias:', error)
      res.status(500).send('Ocorreu um erro')
    }
  },
  subjectsByStudent: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    if (!id) {
      res.status(400).send('ID do aluno é obrigatório.')
      return
    }
    try {
      const resposta = await materiaService.subjectsByStudent(id)
      if (!resposta) {
        res.status(404).send('Nenhuma matéria encontrada para este aluno.')
      } else {
        res.status(200).send(resposta)
      }
    } catch (error) {
      console.error('Erro ao buscar materias por aluno:', error)
      res.status(500).send('Ocorreu um erro')
    }
  },
}

export default subjectsController
