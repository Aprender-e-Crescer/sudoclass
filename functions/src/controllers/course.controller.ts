import { Request, Response } from 'express';
import { courseService } from '../services/course.service';

const courseController = {
    createCurso: async (req: Request, res: Response): Promise<void> => {
        const { id, nome, startDate, endDate, workload } = req.body;
        try {
            const retorno = await courseService.createCurso(id, nome, startDate, endDate, workload);
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o curso.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao cadastrar curso:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o curso.');
        }
    },

    deleteCourse: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const retorno = await courseService.deleteCourse(id);
            if (!retorno) {
                res.status(500).send('Curso não encontrado.');
            } else {
                res.status(200).send(`Curso com o id ${id} deletado com sucesso.`);
            }
        } catch (error) {
            console.error('Erro ao deletar curso:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar deletar o curso.');
        }
    },

    updateCourse: async (req: Request, res: Response): Promise<void> => {
        const { id, nome, startDate, endDate, workload } = req.body;
        try {
            const retorno = await courseService.updateCourse(id, nome, startDate, endDate, workload);
            if (!retorno) {
                res.status(500).send('Curso não encontrado.');
            } else {
                res.status(200).send('Curso atualizado com sucesso.');
            }
        } catch (error) {
            console.error('Erro ao atualizar curso:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar o curso.');
        }
    },

    getCourseById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const retorno = await courseService.getCourseById(id);
            if (!retorno) {
                res.status(500).send('Curso não encontrado.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao buscar curso:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar o curso.');
        }
    },

    addSubjectToCurso: async (req: Request, res: Response): Promise<void> => {
        const { idCurso, idMateria } = req.params;
        try {
            await courseService.addMateriaToCurso(idCurso, idMateria);
            res.status(200).send(`Matéria com ID ${idMateria} adicionada ao curso com ID ${idCurso} com sucesso.`);
        } catch (error) {
            console.error('Erro ao adicionar matéria ao curso:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar adicionar a matéria ao curso.');
        }
    }
    
};

export default courseController;
