import { Request, Response } from 'express';
import { materiaService } from '../services/subjects.service';

const materiasController = {
    createMateria: async (req: Request, res: Response): Promise<void> => {
        const { nomeMatéria, cargaHorária, dataInício, dataFim, idProfessor, id } = req.body;

        if (!nomeMatéria || !cargaHorária || !dataInício || !dataFim || !idProfessor || !id) {
            res.status(400).send('Todos os campos são obrigatórios.');
            return;
        }
        try {
            const retorno = await materiaService.createMateria(nomeMatéria, cargaHorária, dataInício, dataFim, idProfessor, id);
            res.status(200).send(retorno);
        } catch (error) {
            console.error('Erro ao cadastrar matéria:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar a matéria.');
        }
    },

    updateMateria: async (req: Request, res: Response): Promise<void> => {
        const { nomeMatéria, cargaHorária, dataInício, dataFim, idProfessor } = req.body;
        const id = req.params.id;
        try {
            const ret = await materiaService.updateMateria(id, nomeMatéria, cargaHorária, dataInício, dataFim, idProfessor);
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

    deleteMateria: async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        const { nomeMatéria } = req.body;

        try {
            const ret = await materiaService.deleteMateria(id, nomeMatéria);
            if (!ret) {
                res.status(500).send('Não foi possível deletar a matéria.');
            } else {
                res.status(200).send(ret);
            }
        } catch (error) {
            console.error('Erro ao deletar matéria:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar deletar a matéria.');
        }
    },

    getMateriaById: async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;

        if (!id) {
            res.status(400).send('ID da matéria é obrigatório.');
            return;
        }
        try {
            const ret = await materiaService.getMateriaById(id);
            if (!ret) {
                res.status(404).send('Matéria não encontrada.');
            } else {
                res.status(200).send(ret);
            }
        } catch (error) {
            console.error('Erro ao buscar matéria:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar a matéria.');
        }
    }
};

export default materiasController;
