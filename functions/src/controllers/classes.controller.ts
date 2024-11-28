
import { Request, Response } from 'express'
import { classesService } from '../services/classes.service'

const classesController = {
  createClass: async (req: Request, res: Response): Promise<void> => {
    const {
      id_turma,
      nome_turma,
      turno,
      cargahoraria,
      datainicio,
      datafim,
      ementa,
      dataFinalIncricao,
      vagasincricoes,
    } = req.body

    try {
      if (
        !id_turma ||
        !nome_turma ||
        !turno ||
        !cargahoraria ||
        !datainicio ||
        !datafim ||
        !ementa ||
        !dataFinalIncricao ||
        vagasincricoes === undefined
      ) {
        res.status(400).send('Todos os campos sao obrigatorios ')
        return
      }

      const result = await classesService.createClass(
        id_turma,
        nome_turma,
        turno,
        cargahoraria,
        new Date(datainicio),
        new Date(datafim),
        ementa,
        new Date(dataFinalIncricao),
        vagasincricoes
      )

      res.status(200).send(result)
    } catch (error) {
      console.error('Erro ao registrar a turma:', error)
      res.status(500).send('Ocorreu um erro')
    }
  },

  updateClass: async (req: Request, res: Response): Promise<void> => {
    const {
      nome_turma,
      turno,
      cargahoraria,
      datainicio,
      datafim,
      ementa,
      dataFinalIncricao,
      vagasincricoes,
    } = req.body

    const { id } = req.params

    try {
      const turmaId = parseInt(id)
      if (
        !nome_turma ||
        !turno ||
        !cargahoraria ||
        !datainicio ||
        !datafim ||
        !ementa ||
        !dataFinalIncricao ||
        vagasincricoes === undefined
      ) {
        res.status(400).send('Todos os campos sao obrigatorios')
        return
      }

      const result = await classesService.updateClass(
        turmaId ,
        nome_turma,
        turno,
        cargahoraria,
        new Date(datainicio),
        new Date(datafim),
        ementa,
        new Date(dataFinalIncricao),
        vagasincricoes
      )


      res.status(200).send(result)
    } catch (error) {
      console.error('Erro ao atualizar a turma:', error)
      res.status(500).send('Ocorreu um erro ')
    }
  },

  deleteClass: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    try {
      const turmaId = parseInt(id)
      

      const verificaTurma = await classesService.verificaridExistente(turmaId)
      if (!verificaTurma) {
        res.status(404).send('Turma nao encontrada')
        return
      }

      const result = await classesService.deleteClass(turmaId)
      res.status(200).send(result)
    } catch (error) {
      console.error('Erro ao excluir a turma:', error)
      res.status(500).send('Ocorreu um erro')
    }
  },
  getClassesbyid: async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params
    try {
      const result = await classesService.getClassesbyid(parseInt(id))
      if(!result){
        res.status(500).send('Turma nao encontrada')
      }else{
      res.status(200).send(result)}
    }catch(error){
      console.error('Erro ao buscar a turma:', error)
      res.status(500).send('Ocorreu um erro')
    }
  },
  

  addStudentsToClass: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { studentIds } = req.body

    try {
      if (!studentIds || studentIds.length === 0) {
        res.status(400).send('IDs dos alunos sao obrigatorios')
        return
      }

      const result = await classesService.addStudentsToClass(studentIds, parseInt(id))
      res.status(200).send(result)
    } catch (erro) {
      console.error('Erro ao adicionar alunos a turma:', erro)
      res.status(500).send('Ocorreu um erro ')
    }
  },

  liststudentsinClass: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      if (!id) {
        res.status(400).send('ID da turma e obrigatorio')
        return
      }
      const result = await classesService.liststudentsinClass(parseInt(id, 10));
      res.status(200).send(result)
    } catch (erro) {
      console.error('Erro ao listar alunos da turma:', erro)
      res.status(500).send('Ocorreu um erro')
    }
  },

  listSubjectsInClass: async (req: Request, res: Response): Promise<void> => {
    const { id_turma } = req.params
    try {
      if (!id_turma) {
        res.status(400).send('ID da turma e obrigatorio.' )
        return
      }
      const turmaId = parseInt(id_turma, 10);
      const verificaTurma = await classesService.verificaridExistente(turmaId)
      if (!verificaTurma) {
        res.status(404).send('esse id de Turma nao existe')
        return
      }
  
      
      const result = await classesService.listSubjectsInClass(turmaId)
  
      res.status(200).send(result)
    } catch (error) {
      console.error('Erro ao listar materias em turmas:', error)
      res.status(500).send('Erro ao listar materias na turma.' )
    }
  }
  
}
 

export default classesController
