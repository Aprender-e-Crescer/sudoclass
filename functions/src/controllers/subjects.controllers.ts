import { Request, Response } from 'express';
import { materiaService } from '../services/subjects.service';

const subjectsController = {
    createSubject: async (req: Request, res: Response): Promise<void> => {
        const { idCurso, nomeMatéria, cargaHorária, dataInício, dataFim, idProfessor, id: idMateria, ementa } = req.body;

        if (!idCurso || !nomeMatéria || !cargaHorária || !dataInício || !dataFim || !idProfessor || !idMateria || !ementa) {
            res.status(400).send('Todos os campos são obrigatórios.');
            return;
        }

        try {
            const retorno = await materiaService.createSubject(
                idMateria,
                nomeMatéria,
                cargaHorária,
                dataInício,
                dataFim,
                idProfessor,
                ementa,
                idCurso
            );
            res.status(200).send(retorno);
        } catch (error) {
            console.error('Erro ao cadastrar matéria:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar a matéria.');
        }
    },

    updateSubject: async (req: Request, res: Response): Promise<void> => {
        const { idMateria, idCurso, idProfessor } = req.params;
    
        const { nomeMatéria, cargaHorária, dataInício, dataFim, ementa } = req.body;
    
        if (!idMateria || !idCurso || !idProfessor || !nomeMatéria || !cargaHorária || !dataInício || !dataFim || !ementa) {
            res.status(400).send('Todos os campos são obrigatórios.');
            return;
        }
    
        try {
            const ret = await materiaService.updateSubject(
                idMateria,
                idCurso,
                nomeMatéria,
                cargaHorária,
                dataInício,
                dataFim,
                idProfessor,
                ementa,
            );
    
            if (!ret) {
                res.status(500).send('Não foi possível atualizar a matéria.');
            } else {
                res.status(200).send(ret);
            }
        } catch (error) {
            console.error('Erro ao atualizar matéria:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar a matéria.');
        }
    },
    
    deleteSubject: async (req: Request, res: Response): Promise<void> => {
        const idMateria = req.params.id;

        if (!idMateria) {
            res.status(400).send('ID da matéria é obrigatório.');
            return;
        }

        try {
            const ret = await materiaService.deleteSubject(idMateria); 
            if (!ret) {
                res.status(500).send('Não foi possível deletar a matéria.');
            } else {
                res.status(200).send('Matéria deletada com sucesso.');
            }
        } catch (error) {
            console.error('Erro ao deletar matéria:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar deletar a matéria.');
        }
    },

    getSubjectById: async (req: Request, res: Response): Promise<void> => {
        const idMateria = req.params.id;

        if (!idMateria) {
            res.status(400).send('ID da matéria é obrigatório.');
            return;
        }

        try {
            const ret = await materiaService.getSubjectById(idMateria);
            if (!ret) {
                res.status(404).send('Matéria não encontrada.');
            } else {
                res.status(200).send(ret);
            }
        } catch (error) {
            console.error('Erro ao buscar matéria:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar a matéria.');
        }
    },
    addSubjectToClass: async (req: Request, res: Response): Promise<void> => {
        const { idMateria} = req.body;
        const { idTurma } = req.params;
        try {
            await materiaService.addSubjectToClass(idTurma, idMateria);
            res.status(200).send(`Matéria com ID ${idMateria} adicionada a turma com ID ${idTurma} com sucesso.`);
        } catch (error) {
            console.error('Erro ao adicionar matéria a turma:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar adicionar a matéria a turma.');
        }
    }
};

export default subjectsController;
