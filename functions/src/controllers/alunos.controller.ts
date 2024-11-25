import { Request, Response } from 'express';
import { alunoService } from '../services/alunos.service';

const alunosController = {
    createAlunos: async (req: Request, res: Response): Promise<void> => {
        const {id,
            nomeCompleto,
            email,
            estadodeexpedicaorg,
            estado,
            municipio,
            rua,
            bairro, 
            numero,
            dataDeNascimento, 
            cpf,
            rg,
            dataExpedicaoRg, 
            estadoDeNascimento,
            cidadeDeNascimeto} = req.body;
            console.log(req.body);
            
        
        try {
            const retorno = await alunoService.createAluno(id,
                nomeCompleto,
                email,
                estadodeexpedicaorg,
                estado,
                municipio,
                rua,
                bairro, 
                numero,
                dataDeNascimento, 
                cpf,
                rg,
                dataExpedicaoRg, 
                estadoDeNascimento,
                cidadeDeNascimeto);
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o aluno.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o aluno.');
        }
    },

    updateAlunos: async (req: Request, res: Response): Promise<void> => {
        const {nomeCompleto,
            email,
            telefone,
            estado,
            municipio,
            rua,
            bairro, 
            numero,
            dataDeNascimento, 
            cpf,
            rg,
            dataExpedicaoRg, 
            estadoDeNascimento,
            cidadeDeNascimeto} = req.body;
        const id = req.params.id; 
        try {
            const ret = await alunoService.updateAluno(
                id,
                nomeCompleto,
                email,
                telefone,
                estado,
                municipio,
                rua,
                bairro, 
                numero,
                dataDeNascimento, 
                cpf,
                rg,
                dataExpedicaoRg, 
                estadoDeNascimento,
                cidadeDeNascimeto);
            if (!ret) {
                res.status(500).send('Não foi possível atualizar o aluno.');
            } else {
                res.status(200).send('Atualização realizada com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar o aluno.');
        }
    },

    deleteStudent: async (req: Request,  res: Response): Promise<void> => {
        const id = req.params.id; 
        try {
            const ret = await alunoService.deleteStudent(id);
            if (!ret) {
                res.status(500).send('Não foi possível deletar o aluno.');
            } else {
                res.status(200).send('Aluno delatado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao deltar o aluno:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar deletar o aluno.');
        }
    },
    
        getStudent: async (req: Request,  res: Response): Promise<void> => {
        const id = req.params.id;
        try {
            const ret = await alunoService.getStudent(id);
            if (!ret) {
                res.status(500).send('Não foi possível deletar o aluno.');
            } else {
                res.status(200).send(ret);
            }
        } catch (error) {
            console.error('Erro ao deltar o aluno:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar deletar o aluno.');
        }
    }
    

};

export default alunosController; 