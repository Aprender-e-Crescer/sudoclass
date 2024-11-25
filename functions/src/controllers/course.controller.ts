import { Request, Response } from 'express'
import { cursoService } from '../services/course.service'
import { db } from '../config/database'

const courseController = {
  createCurso: async (req: Request, res: Response): Promise<void> => {
    const { id, nome, cargaHoraria, dataInicio, dataFim, dataInicioInscricoes, dataFimInscricoes, numeroVagas, ementa } = req.body
    try {
      const retorno = await cursoService.criarCurso(id, nome, cargaHoraria, dataInicio, dataFim, dataInicioInscricoes, dataFimInscricoes, numeroVagas, ementa)
      if (!retorno) {
        res.status(500).send('Não foi possível cadastrar o curso.')
      } else {
        res.status(200).send(retorno)
      }
    } catch (error) {
      console.error('Erro ao cadastrar curso:', error)
      res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o curso.')
    }
  },

  deleteCourse: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
     
      const cursoExiste = await cursoService.verificarIdExistente(id)
  
      if (!cursoExiste) {
        res.status(404).send('Curso nao encontrado.')
        return;
      }
  
     
      const deletadoComSucesso = await cursoService.deletarCurso(id)
  
      if (!deletadoComSucesso) {
        res.status(500).send('Falha ao deletar o curso.')
        return;
      }
  
      res.status(200).send('Curso deletado com sucesso.')
    } catch (error) {
      console.error('Erro ao deletar curso:', error);
      res.status(500).send('Ocorreu um erro no servidor ao tentar deletar o curso.');
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
      res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar o curso.')
    }
  },

  getCourseById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const retorno = await cursoService.buscarCursoPorId(id)
      if (!retorno) {
        res.status(500).send('Curso não encontrado.')
      } else {
        res.status(200).send(retorno)
      }
    } catch (error) {
      console.error('Erro ao buscar curso:', error)
      res.status(500).send('Ocorreu um erro no servidor ao tentar buscar o curso.')
    }
  },
}

    
      

    



export default courseController
