// import db from '../config/database';

async function createAluno(nome: string, cpf: string): Promise<string>{
    try {
        // const professor = db.query('insert'); // Substitua por sua query real de inserção
        let resposta = "";
        if (!nome || !cpf) {
            resposta = 'Nome e CPF são obrigatórios.';
            return resposta;
        }
        resposta = `O nome que preenchemos é ${nome} e o CPF é ${cpf}`;
        return resposta;
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        return 'Erro ao cadastrar aluno'; 
    }
}
async function updateAluno(id: string, nome: string, cpf: string): Promise<string>{
    try {
        // const professor = db.query('insert'); // Substitua por sua query real de inserção
        let resposta = "";
        if (!id || !nome || !cpf) {
            resposta = 'ID, Nome e CPF são obrigatórios.';
            return resposta;
        }
        resposta = `O aluno que atualizamos é ${nome} que possui o CPF ${cpf}`;
        return resposta;
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        return 'Erro ao atualizar aluno'; 
    }
}



export const alunoService = {
    createAluno: (nome: string, cpf: string) => createAluno(nome, cpf),
    updateAluno: (id: string, nome: string, cpf: string) => updateAluno(id, nome, cpf)
};