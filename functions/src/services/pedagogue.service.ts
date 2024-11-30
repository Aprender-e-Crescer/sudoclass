import { db } from "../config/database";

async function createPedagogue(nome: string, cpf: string, senha: string): Promise<string> {
    try {
        if (!nome || !cpf || !senha) {
            return 'Nome, cpf e senha são obrigatórios.';
        }
        return 'Pedagogo cadastrado com sucesso.';
    } catch (error) {
        console.error('Erro ao cadastrar pedagogo:', error);
        return 'Erro ao cadastrar pedagogo';
    }
}
 
async function updatePedagogue(id: string, nome: string, cpf: string, senha: string): Promise<string> {
    try {
        if (!id || !nome || !cpf || !senha) {
            return 'ID, nome, CPF e senha são obrigatórios.';
        }
        return `Pedagogo com ID ${id} atualizado com sucesso.`;
    } catch (error) {
        console.error('Erro ao atualizar pedagogo:', error);
        return 'Erro ao atualizar pedagogo';
    }
}

async function deletePedagogue(id: string): Promise<string> {
    try {
        if (!id) {
            return 'ID é obrigatório para deletar o pedagogo.';
        }
        return `Pedagogo com ID ${id} deletado com sucesso.`;
    } catch (error) {
        console.error('Erro ao deletar pedagogo:', error);
        return 'Erro ao deletar pedagogo';
    }
}

async function getPedagogue(id: string): Promise<string> {
    try {
        let resposta = "";
        if (!id) {
            resposta = 'ID é obrigatório';
            return resposta;
        }
        const response = await db.query(
            "select * from pedagogo where id_pedagogo = $1",
            [
                parseInt(id),
                ]
            );
            return response.rows[0];

    } catch (error) {
        console.error('Erro ao buscar o aluno:', error);
        return 'Erro ao buscar o aluno';
    }
}

export const pedagogoService = {
    createPedagogue: (nome: string, cpf: string, senha: string) => createPedagogue(nome, cpf, senha),
    updatePedagogue: (id: string, nome: string, cpf: string, senha: string) => updatePedagogue(id, nome, cpf, senha),
    deletePedagogue: (id: string) => deletePedagogue(id),
    getPedagogue: (id: string) => getPedagogue(id)
};
