import { db } from "../config/database";

    async function createUser(
        id_usuario: string,
        email: string,
        senha: string,
        id_aluno: string | null,
        id_professor: string | null,
        id_pedagogo: string | null,
        tipo: string): Promise<any> {
        let res;
        try { 
            if (!email || !senha) { 
                res = 'Campo obrigatório';
                return res;
            }

            if (id_aluno) {
                tipo = 'aluno';
                if(id_professor || id_pedagogo){
                    return "erro"
                }
            }
             else if (id_professor) {
                tipo = 'professor';
                if(id_aluno || id_pedagogo){
                    return "Erro"
                }
            } 
            else if (id_pedagogo) {
                tipo = 'pedagogo';
                if(id_aluno || id_professor){
                    return "Erro"
                }
            } else {
                res = 'É necessário informar pelo menos um papel (aluno, professor ou pedagogo)';
                return res;
            }

            await db.query(
                "INSERT INTO usuario (id_usuario, email, senha, id_aluno, id_professor, id_pedagogo, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                [
                parseInt(id_usuario),
                email,
                senha,
                id_aluno,
                id_professor,
                id_pedagogo,
                tipo
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
async function updateUser(id_usuario: string, email: string, senha: string, trocardesenha: boolean | null): Promise<string>{
    try {
        const response = await db.query(
            "UPDATE usuario SET email = $1, senha = $3, trocardesenha = $4 WHERE id_usuario = $2",
            [
                email,
                parseInt(id_usuario),
                senha,
                trocardesenha
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
async function requestPasswordList(): Promise<any> {
    try {
       const response = await db.query(
        `SELECT u.id_usuario,
            a.nome AS nome_aluno, 
            c.nome_curso
        FROM 
            usuario u
        JOIN 
            alunos a ON u.id_aluno = a.id_aluno
        JOIN
            alunosturma at ON a.id_aluno = at.id_aluno
        JOIN
            turmas t ON at.id_turma = t.id_turma
        JOIN
            curso c ON t.id_curso = c.id_curso
        WHERE
            u.trocardesenha = true`
       )
       return response.rows;
    } catch (error) {
        console.error('Erro ao buscar o usuario troca de senha:', error);
        return 'Erro ao buscar o usuario troca de senha'; 
    }
}


export const usuarioService = {
    createUser: (id_usuario: string, email: string, senha: string, id_aluno: string, id_professor: string, id_pedagogo: string, tipo: string) => createUser(id_usuario, email, senha, id_aluno, id_professor, id_pedagogo, tipo),
    updateUser: (id_usuario: string, email: string, senha: string, trocardesenha: boolean) => updateUser(id_usuario, email, senha, trocardesenha), 
    deleteUser: (id_usuario: string) => deleteUser(id_usuario),
    getUser: (id_usuario: string) => getUser(id_usuario),
    requestPasswordList: () => requestPasswordList()
}