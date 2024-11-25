// import { pool } from '../config/database';

interface AnswerData {
    studentId: number;
    formId: number;
    questionId: number;
    answer: string;
}

interface UpdatedAnswer {
    answer: string;
}

export class AnswerService {
    async createAnswer(answerData: AnswerData): Promise<{ id: number, studentId: number, formId: number, questionId: number, answer: string }> {
        const { studentId, formId, questionId, answer } = answerData;

        if (!studentId || !formId || !questionId || !answer || isNaN(studentId)) {
            throw new Error("Por favor, insira todos os dados corretamente.");
        }

        try {
            const query = `
                INSERT INTO answer (studentId, formId, questionId, answer)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await pool.execute(query, [studentId, formId, questionId, answer]);

            return { id: result.insertId, ...answerData };
        } catch (error) {
            console.error("Erro ao criar resposta:", error);
            throw new Error("Erro ao inserir resposta no banco de dados.");
        }
    }

    async searchAnswerByStudent(studentId: number): Promise<any[]> {
        if (!studentId || isNaN(studentId)) {
            throw new Error('ID do estudante inválido.');
        }

        try {
            const query = `SELECT * FROM answers WHERE studentId = ?`;
            const [rows] = await pool.execute(query, [studentId]);

            if (rows.length === 0) {
                throw new Error("Nenhuma resposta encontrada para o estudante.");
            }

            return rows;
        } catch (error) {
            console.error("Erro ao buscar resposta por estudante:", error);
            throw new Error("Erro ao buscar respostas no banco de dados.");
        }
    }

    async updateAnswer(id: number, updatedData: UpdatedAnswer) {
        const { answer } = updatedData;
        
        if (!id || isNaN(id) || !answer) {
            throw new Error("ID inválido ou resposta não fornecida.");
        }

        try {
            const [existingAnswer] = await pool.execute('SELECT * FROM answers WHERE id = ?', [id]);
            if (existingAnswer.length === 0) {
                throw new Error("Resposta não encontrada.");
            }

            const query = 'UPDATE answers SET answer = ? WHERE id = ?';
            await pool.execute(query, [answer, id]);

            return { id, ...updatedData };
        } catch (error) {
            console.error("Erro ao atualizar resposta:", error);
            throw new Error("Erro ao atualizar a resposta no banco de dados.");
        }
    }

    async deleteAnswer(id: number) {
        if (!id || isNaN(id)) {
            throw new Error("ID inválido para exclusão.");
        }

        try {
            const [existingAnswer] = await pool.execute('SELECT * FROM answers WHERE id = ?', [id]);
            if (existingAnswer.length === 0) {
                throw new Error("Resposta não encontrada para exclusão.");
            }

            const query = 'DELETE FROM answers WHERE id = ?';
            await pool.execute(query, [id]);

            return { message: 'Resposta excluída com sucesso.' };
        } catch (error) {
            console.error("Erro ao deletar resposta:", error);
            throw new Error("Erro ao excluir a resposta no banco de dados.");
        }
    }

    async getAllAnswers(): Promise<any[]> {
        try {
            const query = 'SELECT formId, questionId, answer FROM answers';
            const [rows] = await pool.execute(query);
            if (rows.length === 0) {
                throw new Error("Nenhuma resposta encontrada.");
            }

            return rows;
        } catch (error) {
            console.error("Erro ao buscar todas as respostas:", error);
            throw new Error("Erro ao buscar as respostas no banco de dados");
        }
    }
}
