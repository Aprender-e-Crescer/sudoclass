const express = require('express')
const app = express()

async function createUser(id: string, nome: string, cpf: string, senha: string, email: string): Promise<string> {
    let res;
    try { 
        if (!cpf || !senha || !nome || !email) { 
            res = 'Campo obrigatório';
            return res;
        }
        return '';
    } catch (error) {
        console.error(error);
        res = "Ocorreu um erro interno";
        return res;
    }
}
async function updateUser(id: string, nome: string, cpf: string, email: string): Promise<string>{
    try {
        let resposta = "";
        if (!id || !nome || !cpf || !email) {
            resposta = 'ID, Nome, email e CPF são obrigatórios.';
            return resposta;
        }
        resposta = `O usuario com id: ${id} que atualizamos é ${nome} que possui o CPF ${cpf}`;
        return resposta;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        return 'Erro ao atualizar usuario'; 
    }
}
async function deleteUser(id: string): Promise<string>{
    let resposta = "";
    try {                                            
        if(!id){
            resposta = `Usuario não encontrado`
            return resposta;
        }
        else{
            resposta = `Usuario`;
            return resposta;
        }
    } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        return 'Erro ao deletar usuario'; 
    }
}
async function getUser(id: string): Promise<string> {
    let resposta;
    try {                                            
        if(!id){
            resposta = `Usuario não encontrado`
            return resposta;
        }
        else{
            resposta = `Usuario encontrado com sucesso`;
            return resposta;
        }
    } catch (error) {
        console.error('Erro ao buscar o usuario:', error);
        return 'Erro ao buscar o usuario'; 
    }
}

export const usuarioService = {
    createUser: (id: string, nome: string, cpf: string, senha: string, email: string) => createUser(id, nome, cpf, senha, email),
    updateUser: (id: string, nome: string, cpf: string, email: string) => updateUser(id, nome, cpf, email),
    deleteUser: (id: string) => deleteUser(id),
    getUser: (id: string) => getUser(id)
};