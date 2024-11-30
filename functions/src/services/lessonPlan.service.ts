import { db } from "../config/database";

interface PlanoDeAula {
    id_planoaula: string;
    id_professor: string;
    id_turma: string;
    id_materia: string;
    data_aula: string;
    datainicio: string;
    datafim: string;
    conteudoformativo: string;
    mododeensino: string;
    recursosdidaticos: string;
}

interface Materia {
    id_materia: string;
    id_curso: string;
    id_professor: string;
    nome_materia: string;
    datainicio: string;
    datafim: string;
    ementa: string;
}

export async function createLessonPlan(
    id_professor: string,
    id_turma: string,
    id_materia: string,
    data_aula: string,
    datainicio: string,
    datafim: string,
    conteudoformativo: string,
    mododeensino: string,
    recursosdidaticos: string
): Promise<string> {
    try {
        if (
            !id_professor ||
            !id_turma ||
            !id_materia ||
            !data_aula ||
            !datainicio ||
            !datafim ||
            !conteudoformativo ||
            !mododeensino ||
            !recursosdidaticos
        ) {
            return "Todos os campos são obrigatórios.";
        }

        const materia = await db.query("SELECT * FROM materia WHERE id_materia = $1", [id_materia]);
        if (materia.rows.length === 0) {
            return `Matéria com ID ${id_materia} não encontrada.`;
        }

        const novoPlanoDeAula = await db.query(
            `INSERT INTO planoaula 
            (id_professor, id_turma, id_materia, data_aula, datainicio, datafim, conteudoformativo, mododeensino, recursosdidaticos) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_planoaula`,
            [id_professor, id_turma, id_materia, data_aula, datainicio, datafim, conteudoformativo, mododeensino, recursosdidaticos]
        );

        return `Plano de aula criado com sucesso. ID: ${novoPlanoDeAula.rows[0].id_planoaula}`;
    } catch (error) {
        console.error("Erro ao criar plano de aula:", error);
        return "Erro ao cadastrar plano de aula.";
    }
}

export async function getLessonPlan(id_planoaula: string): Promise<string> {
    try {
        const planoDeAula = await db.query("SELECT * FROM planoaula WHERE id_planoaula = $1", [id_planoaula]);
        if (planoDeAula.rows.length === 0) return "Plano de aula não encontrado.";

        const {
            id_professor,
            id_turma,
            id_materia,
            data_aula,
            datainicio,
            datafim,
            conteudoformativo,
            mododeensino,
            recursosdidaticos,
        } = planoDeAula.rows[0];

        const materia = await db.query("SELECT nome_materia FROM materia WHERE id_materia = $1", [id_materia]);
        const nome_materia = materia.rows.length > 0 ? materia.rows[0].nome_materia : "Nome não encontrado";

        return `
            Plano de Aula:
            ID: ${id_planoaula}
            Professor: ${id_professor}
            Turma: ${id_turma}
            Matéria: ${nome_materia}
            Data: ${data_aula}
            Início: ${datainicio}
            Fim: ${datafim}
            Conteúdo Formativo: ${conteudoformativo}
            Modo de Ensino: ${mododeensino}
            Recursos Didáticos: ${recursosdidaticos}
        `;
    } catch (error) {
        console.error("Erro ao buscar plano de aula:", error);
        return "Erro ao buscar plano de aula.";
    }
}

export async function updateLessonPlan(
    id_planoaula: string,
    id_professor: string,
    id_turma: string,
    id_materia: string,
    data_aula: string,
    datainicio: string,
    datafim: string,
    conteudoformativo: string,
    mododeensino: string,
    recursosdidaticos: string
): Promise<string> {
    try {
        if (
            !id_planoaula ||
            !id_professor ||
            !id_turma ||
            !id_materia ||
            !data_aula ||
            !datainicio ||
            !datafim ||
            !conteudoformativo ||
            !mododeensino ||
            !recursosdidaticos
        ) {
            return "Todos os campos são obrigatórios.";
        }

        const planoDeAula = await db.query("SELECT * FROM planoaula WHERE id_planoaula = $1", [id_planoaula]);
        if (planoDeAula.rows.length === 0) return "Plano de aula não encontrado.";

        await db.query(
            `UPDATE planoaula 
            SET id_professor = $1, id_turma = $2, id_materia = $3, data_aula = $4, datainicio = $5, datafim = $6, 
            conteudoformativo = $7, mododeensino = $8, recursosdidaticos = $9 
            WHERE id_planoaula = $10`,
            [id_professor, id_turma, id_materia, data_aula, datainicio, datafim, conteudoformativo, mododeensino, recursosdidaticos, id_planoaula]
        );

        return `Plano de aula atualizado com sucesso. ID: ${id_planoaula}`;
    } catch (error) {
        console.error("Erro ao atualizar plano de aula:", error);
        return "Erro ao atualizar plano de aula.";
    }
}

export async function deleteLessonPlan(id_planoaula: string): Promise<string> {
    try {
        const planoDeAula = await db.query("SELECT * FROM planoaula WHERE id_planoaula = $1", [id_planoaula]);
        if (planoDeAula.rows.length === 0) return "Plano de aula não encontrado.";

        await db.query("DELETE FROM planoaula WHERE id_planoaula = $1", [id_planoaula]);

        return `Plano de aula excluído com sucesso. ID: ${id_planoaula}`;
    } catch (error) {
        console.error("Erro ao excluir plano de aula:", error);
        return "Erro ao excluir plano de aula.";
    }
}