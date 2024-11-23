import {db} from '../config/database';

async function createAluno(id: string, nomeCompleto: string, email: string, estadodeexpedicaorg: string, estado: string, municipio: string, rua: string, bairro: number, numero: number, dataDeNascimento: Date, cpf: string, rg: string, dataExpedicaoRg: Date, estadoDeNascimento: string, cidadeDeNascimeto: string,): Promise<string> {
    try {
        let resposta = "";
        if (!id 
            || !nomeCompleto 
            || !email 
            || !estado 
            || !municipio 
            || !rua 
            || !bairro 
            || !numero
            || !dataDeNascimento 
            || !cpf 
            || !rg 
            || !dataExpedicaoRg 
            || !estadoDeNascimento
            || !estadodeexpedicaorg
            || !cidadeDeNascimeto) {
            resposta = 'Todos os campos são obrigatórios para cadastrar o aluno.';
            return resposta;
        }

        await db.query(
            "INSERT INTO alunos (id_aluno, nome, data_nasc, email, estado, municipio, rua, bairro, numero, rg, datadeexpedicaorg, estadodeexpedicaorg, estadonascimento, cidadenascimento, cpf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
            [
                id,
                nomeCompleto,
                dataDeNascimento, 
                email,
                estado,
                municipio,
                rua,
                bairro,
                numero,
                rg, 
                dataExpedicaoRg,
                estadodeexpedicaorg,
                estadoDeNascimento,
                cidadeDeNascimeto,
                cpf,
            ]
            );
            resposta = await getStudent(id);
            return resposta;
        
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        return 'Erro ao cadastrar aluno';
    }
}
async function updateAluno(id: string, nomeCompleto: string, cpf: string, email: string, telefone: string, estado: string, municipio: string, rua: string, bairro: string, numeroDaCasa: number, dataDeNascimento: string, rg: string, dataExpedicaoRg: string, estadoDeNascimento: string, cidadeDeNascimeto: string): Promise<string> {
    try {
        let resposta = "";
        if (!id || !nomeCompleto || !cpf || !email || !telefone || !estado || !municipio || !rua || !bairro || !numeroDaCasa || !dataDeNascimento || !rg || !estadoDeNascimento || !cidadeDeNascimeto || !dataExpedicaoRg) {
            resposta = 'Todos os campos são obrigatórios para cadastrar o aluno.';
            return resposta;
        }
        await db.query(
            "INSERT INTO alunos (id_aluno, nome, data_nasc, email, estado, municipio, rua, bairro, numero, rg, datadeexpedicaorg, estadodeexpedicaorg, estadonascimento, cidadenascimento, cpf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
            [
                id,
                nomeCompleto,
                email,
                telefone,
                estado,
                municipio,
                rua,
                bairro, 
                numeroDaCasa,
                dataDeNascimento, 
                cpf,
                rg,
                dataExpedicaoRg, 
                estadoDeNascimento,
                cidadeDeNascimeto

                ]
            );
            resposta = await getStudent(id);
            return resposta;

    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        return 'Erro ao atualizar aluno';
    }
}

async function deleteStudent(id: string): Promise<string> {
    try {
        let resposta = '';
        if (!id){
            resposta = 'O id é obrigatório para deletar o aluno.';
            return resposta;
        }
        const response = await db.query(
            "INSERT INTO aluno (id_aluno) VALUES ($1)",
            [
                id,
                ]
            );
            resposta = "Aluno deletado com sucesso";
            return response.rows[0], resposta;
            
    } catch (error) {
        console.log(error)
        return 'Erro ao deletar o aluno';
    }
}

async function getStudent(id: string): Promise<string> {
    try {
        let resposta = "";
        if (!id) {
            resposta = 'ID é obrigatório';
            return resposta;
        }
        const response = await db.query(
            "select * from alunos where id_aluno = $1",
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

export const alunoService = {
    createAluno: (id : string,
        nomeCompleto: string, 
        email: string,
        estadodeexpedicaorg: string, 
        estado: string, 
        municipio: string, 
        rua: string, 
        bairro: number, 
        numero: number, 
        dataDeNascimento: Date, 
        cpf: string, 
        rg: string, 
        dataExpedicaoRg: Date, 
        estadoDeNascimento: string, 
        cidadeDeNascimeto: string,
        ) => createAluno(id, nomeCompleto, email, estadodeexpedicaorg, estado, municipio, rua, bairro, numero, dataDeNascimento, cpf,rg, dataExpedicaoRg, estadoDeNascimento, cidadeDeNascimeto),
    updateAluno: (id: string,
        nomeCompleto: string, 
        cpf: string, 
        email: string, 
        telefone: string, 
        estado: string, 
        municipio: string, 
        rua: string, 
        bairro: string,
        numeroDaCasa: number,
        dataDeNascimento: string, 
        rg: string, 
        dataExpedicaoRg: string,
        estadoDeNascimento: string, 
        cidadeDeNascimeto: string) =>updateAluno(id, nomeCompleto, cpf, email, telefone, estado, municipio, rua, bairro, numeroDaCasa, dataDeNascimento, rg, dataExpedicaoRg, estadoDeNascimento, cidadeDeNascimeto),
    deleteStudent: (id: string) => deleteStudent(id),
    getStudent: (id: string) => getStudent(id),
}