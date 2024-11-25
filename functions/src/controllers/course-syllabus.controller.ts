import { Request, Response } from 'express';
import { courseSyllabusService } from '../services/course-syllabus.services';

const courseSyllabusController = {
    createSyllabus: async (req: Request, res: Response): Promise<void> => {
        const { courseId, subjectId, syllabus } = req.body;
        try {
            const retorno = await courseSyllabusService.createCourseSyllabus(courseId, subjectId, syllabus);
            if (retorno === 'A ementa é obrigatória.') {
                res.status(400).send(retorno);
            } else {
                res.status(201).send('Ementa cadastrada com sucesso');
            }
        } catch (error) {
            console.error('Erro ao cadastrar ementa:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar a ementa.');
        }
    },

    updateSyllabus: async (req: Request, res: Response): Promise<void> => {
        const { courseId, subjectId, syllabus } = req.body;
        try {
            const retorno = await courseSyllabusService.updateCourseSyllabus(courseId, subjectId, syllabus);
            if (retorno === 'A ementa é obrigatória.') {
                res.status(400).send(retorno);
            } else {
                res.status(200).send('Ementa atualizada com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar ementa:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar a ementa.');
        }
    },

    deleteSyllabus: async (req: Request, res: Response): Promise<void> => {
        const { courseId, subjectId } = req.params;
        try {
            const retorno = await courseSyllabusService.deleteCourseSyllabus(courseId, subjectId);
            if (!retorno) {
                res.status(404).send('Curso ou matéria não encontrados');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao excluir ementa:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar excluir a ementa.');
        }
    },

    getSyllabus: async (req: Request, res: Response): Promise<void> => {
        const { courseId, subjectId } = req.params;
        try {
            const retorno = await courseSyllabusService.getCourseSyllabus(courseId, subjectId);
            if (!retorno) {
                res.status(404).send('Ementa não encontrada para o curso e matéria especificados.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao buscar ementa:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar a ementa.');
        }
    }
};

export default courseSyllabusController;
