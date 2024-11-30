import { Request, Response } from 'express'
import { cursoService } from '../services/course.service'
import { db } from '../config/database'

const courseController = {
  createCurso: async (req: Request, res: Response): Promise<void> => {
    const { id, nome, cargaHoraria, dataInicio, dataFim, dataInicioInscricoes, dataFimInscricoes, numeroVagas, ementa } = req.body
    try {
      const retorno = await cursoService.criarCurso(id, nome, cargaHoraria, dataInicio, dataFim, dataInicioInscricoes, dataFimInscricoes, numeroVagas, ementa)
      if (!retorno) {
        res.status(500).send('Não foi possivel cadastrar o curso.')
      } else {
        res.status(200).send(retorno)
      }
    } catch (error) {
      console.error('Erro ao cadastrar curso:', error)
      res.status(500).send('Ocorreu um erro ')
    }
  },

  deleteCourse: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
     
      const cursoExiste = await cursoService.verificarIdExistente(id)
  
      if (!cursoExiste) {
        res.status(404).send('Curso nao encontrado.')
        return
      }
  
     
      const deletadoComSucesso = await cursoService.deletarCurso(id)
  
      if (!deletadoComSucesso) {
        res.status(500).send('Falha ao deletar o curso.')
        return;
      }
  
      res.status(200).send('Curso deletado com sucesso.')
    } catch (error) {
      console.error('Erro ao deletar curso:', error);
      res.status(500).send('Ocorreu um erro ');
    }
  },
  

  updateCourse: async (req: Request, res: Response): Promise<void> => {
    const { id, nome, cargaHoraria, dataInicio, dataFim, dataInicioInscricoes, dataFimInscricoes, numeroVagas, ementa } = req.body
    try {
      const retorno = await cursoService.atualizarCurso(id, nome, cargaHoraria, dataInicio, dataFim, dataInicioInscricoes, dataFimInscricoes, numeroVagas, ementa)
      if (!retorno) {
        res.status(500).send('Curso não encontrado.')
      } else {
        res.status(200).send('Curso atualizado com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao atualizar curso:', error)
      res.status(500).send('Ocorreu um erro')
    }
  },

  listarCursos: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const retorno = await cursoService.listarCursos(id);
 
      if (!retorno || retorno.length === 0) {
       
        res.status(404).send('Nenhum curso encontrado para o ID fornecido.');
        return;
      }
 
     
      res.status(200).json(retorno);
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).send('Ocorreu um erro');
    }
  },

  AlunosnoCurso: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const alunos = await cursoService.AlunosnoCurso(id)
      if (!alunos) {
        res.status(500).send('Curso nao encontrado.')
      } else {
        res.status(200).send(alunos)
      }
    } catch (error) {
      console.error('Erro ao buscar alunos do curso:', error)
      res.status(500).send('Ocorreu um erro')
    }
  },
}
 

export default courseController
