const express = require('express')
const app = express()
import { response } from 'express';
import { db } from '../config/database';

 async function createUser(id_usuario: string, email: string, senha: string, id_aluno: string, id_professor: string, id_pedagogo: string): Promise<any> {
    let res;
    try { 
        if (!email || !senha) { 
            res = 'Campo obrigatório';
            return res;
        }
        await db.query(
            "INSERT INTO usuario (id_usuario, email, senha, id_aluno, id_professor, id_pedagogo) VALUES ($1, $2, $3, $4, $5, $6)",
            [
            parseInt(id_usuario),
            email,
            senha,
            parseInt(id_aluno),
            id_professor,
            id_pedagogo
            ]   
        );
        const response = await getUser(id_usuario);
        return response;
    } catch (error) {
        console.error(error);
        res = "Ocorreu um erro ao criar o usuario";
        return res;
    }
}
 
async function updateUser(id_usuario: string, email: string, senha: string,  id_aluno: string, id_professor: string, id_pedagogo: string): Promise<string>{
    try {
        const response = await db.query(
            "UPDATE usuario SET email = $1, senha = $3, id_aluno = $4, id_professor = $5, id_pedagogo = $6 WHERE id_usuario = $2",
            [
                email,
                parseInt(id_usuario),
                senha,
                parseInt(id_aluno),
                parseInt(id_professor),
                parseInt(id_pedagogo)
            ]
        );
        const user = await getUser(id_usuario);
        return user;
    }
     catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        return 'Erro ao atualizar usuario'; 
    }
} 
    async function deleteUser(id_usuario: string): Promise<string>{
    try {                                            
        const response = await db.query(
            "DELETE FROM usuario WHERE id_usuario = $1",
            [
            parseInt(id_usuario)
            ]
        )
        return 'usuario deletado com sucesso';
    } catch (error) {
        throw new Error("Falha ao excluir usuario");
        return 'falha ao excluir usuario';
    }
} 
async function getUser(id_usuario: string): Promise<any> {
    let resposta;
    try {                                      
       const response = await db.query(
        "SELECT * FROM usuario WHERE id_usuario = $1",
        [parseInt(id_usuario)]
       )
       return response.rows[0];
    } catch (error) {
        console.error('Erro ao buscar o usuario:', error);
        return 'Erro ao buscar o usuario'; 
    }
}

export const usuarioService = {
    createUser: (id_usuario: string, email: string, senha: string, id_aluno: string, id_professor: string, id_pedagogo: string) => createUser(id_usuario, email, senha, id_aluno, id_professor, id_pedagogo),
    updateUser: (id_usuario: string, email: string, senha: string, id_aluno: string, id_professor: string, id_pedagogo: string) => updateUser(id_usuario, email, senha, id_aluno, id_professor, id_pedagogo), 
    deleteUser: (id_usuario: string) => deleteUser(id_usuario),
    getUser: (id_usuario: string) => getUser(id_usuario)
}