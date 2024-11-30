import { Request, Response } from 'express';
import { pedagogoService } from '../services/pedagogue.service';

const pedagogosController = {
    createPedagogue: async (req: Request, res: Response): Promise<void> => {
        const { nome, cpf, senha } = req.body;
        try {
            const result = await pedagogoService.createPedagogue(nome, cpf, senha);
            if (!result) {
                res.status(500).send('Não foi possível cadastrar o pedagogo');
            } else {
                res.status(200).send('Pedagogo cadastrado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao cadastrar pedagogo:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o pedagogo.');
        }
    },

    updatePedagogue: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { nome, cpf, senha } = req.body;
        try {
            const result = await pedagogoService.updatePedagogue(id, nome, cpf, senha);
            if (!result) {
                res.status(500).send('Não foi possível atualizar o pedagogo');
            } else {
                res.status(200).send(result);
            }
        } catch (error) {
            console.error('Erro ao atualizar pedagogo:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar o pedagogo.');
        }
    },

    deletePedagogue: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const result = await pedagogoService.deletePedagogue(id);
            if (!result) {
                res.status(500).send('Pedagogo não encontrado');
            } else {
                res.status(200).send(result);
            }
        } catch (error) {
            console.error('Erro ao deletar pedagogo:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar deletar o pedagogo.');
        }
    },

    getPedagogue: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const result = await pedagogoService.getPedagogue(id);
            if (!result) {
                res.status(500).send('Pedagogo não encontrado');
            } else {
                res.status(200).send(result);
            }
        } catch (error) {
            console.error('Erro ao buscar pedagogo:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar o pedagogo.');
        }
    }
};

export default pedagogosController;
