import { Request, Response } from 'express';
import { usuarioService } from '../services/usuario.service';

const usuarioController = {
    CreateUser: async (req: Request, res: Response): Promise<void> => { 
        const { id, nome, email, senha, cpf } = req.body;
        try {
            const retorno = await usuarioService.createUser(id, nome, cpf, senha, email);
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o usuário.');
            } else {
                res.status(200).send('Cadastro realizado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o usuário.');
        }
    },
    getUser: async(req: Request, res: Response): Promise<void> => {
        const {id} = req.body;
        try{
            const retorno = await usuarioService.getUser(id);
            if(!retorno){
                 res.status(500).send(`Não foi possivel buscar o usuario`);
            }else{
                  res.status(200).send(`Usuario buscado com sucesso`);
            }
        }
        catch(error){
            console.error('Erro ao buscar usuário:', error);
            res.status(500).send( 'Ocorreu um erro no servidor ao tentar buscar o usuário.');
        }
    },

    deleteUser: async(req: Request, res: Response): Promise<void> => {
        const {id} = req.body;
        try{
            const retorno = await usuarioService.deleteUser(id);
            if(!retorno){
                 res.status(500).send(`Não foi possivel deletar o usuario`);
            }else{
                  res.status(200).send(`O usuario com id: ${id} foi deletado com sucesso`);
            }
        }
        catch(error){
            console.error('Erro ao deletar usuário:', error);
            res.status(500).send( 'Ocorreu um erro no servidor ao tentar deletar o usuário.');
        }
    },

    updateUser: async(req: Request, res: Response): Promise<void> => {
        const {id, nome, cpf, email} = req.body;
        try{
            const retorno = await usuarioService.deleteUser(id);
            if(!retorno){
                 res.status(500).send(`Não foi possivel atualizar o usuario`);
            }else{
                  res.status(200).send(`O usuario com id: ${id} e o foi atualizado com sucesso`) 
            }
        }
        catch(error){
            console.error('Erro ao atualizar o usuário:', error);
            res.status(500).send( 'Ocorreu um erro no servidor ao tentar atualizar o usuário.');
        }
    } 
}
export default usuarioController