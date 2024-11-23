import { Request, Response } from 'express';
import { alunoService } from '../services/alunos.service';

const alunosController = {
    createAlunos: async (req: Request, res: Response): Promise<void> => {
        const { nome, cpf } = req.body;
        try {
            const retorno = await alunoService.createAluno(nome, cpf);
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o aluno.');
            } else {
                res.status(200).send('Cadastro realizado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o aluno.');
        }
    },

    updateAlunos: async (req: Request, res: Response): Promise<void> => {
        const { nome, cpf } = req.body;
        const id = req.params.id; 
        try {
            const ret = await alunoService.updateAluno(id, nome, cpf);
            if (!ret) {
                res.status(500).send('Não foi possível atualizar o aluno.');
            } else {
                res.status(200).send('Atualização realizada com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar o aluno.');
        }
    }
};

export default alunosController; 