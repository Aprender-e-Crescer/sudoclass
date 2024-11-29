import { db } from '../config/database';async function createSubject(
    nomeMatéria: string,
    cargaHorária: string,
    dataInício: Date,
    dataFim: Date,
    idProfessor: string,
    idMateria: string,
    ementa: string,
    idCurso: string 
): Promise<string> {
    try {
        if (!idMateria || !nomeMatéria || !cargaHorária || !dataInício || !dataFim || !idProfessor || !ementa || !idCurso) {
            return 'ID, Nome da matéria, carga horária, data de início, data de fim, ID do professor, e curso são obrigatórios.';
        }

        const response = await db.query(
            `INSERT INTO materia (id_materia, id_curso, id_professor, nome_materia, carga_horaria_materia, datainicio, datafim, ementa)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [idMateria, idCurso, idProfessor, nomeMatéria, cargaHorária, dataInício, dataFim, ementa]
        );

        const resposta = `Matéria ${nomeMatéria} do curso ${idCurso}, com carga horária de ${cargaHorária}, de ${dataInício} a ${dataFim}, e professor com ID ${idProfessor} foi cadastrada com sucesso.`;
        console.log(resposta);
        return resposta;
    } catch (error) {
        console.error('Erro ao criar matéria:', error);
        return 'Erro ao cadastrar matéria';
    }
}

async function updateSubject(
    idMateria: string,
    idCurso: string,
    idProfessor: string,
    nomeMatéria: string,
    cargaHorária: string,
    dataInício: Date,
    dataFim: Date,
    ementa: string
): Promise<string> {
    try {
        if (!idMateria || !idCurso || !idProfessor || !nomeMatéria || !cargaHorária || !dataInício || !dataFim || !ementa) {
            return 'ID da matéria, ID do curso, ID do professor, nome da matéria, carga horária, datas e ementa são obrigatórios.';
        }

        const response = await db.query(
            `UPDATE materia
             SET nome_materia = $1, carga_horaria_materia = $2, datainicio = $3, datafim = $4, ementa = $5
             WHERE id_materia = $6 AND id_curso = $7 AND id_professor = $8`,
            [nomeMatéria, cargaHorária, dataInício, dataFim, ementa, idMateria, idCurso, idProfessor]
        );

        if (response.rowCount === 0) {
            return 'Nenhuma matéria encontrada com os parâmetros fornecidos.';
        }

        const materiaAtualizada = await getSubjectById(idMateria);
        return materiaAtualizada;
    } catch (error) {
        console.error('Erro ao atualizar matéria:', error);
        return 'Erro ao atualizar matéria.';
    }
}



async function deleteSubject(idMateria: string): Promise<boolean> {
    try {
        const response = await db.query(
            "DELETE FROM materia WHERE id_materia = $1",
            [idMateria]
        );

        if (response) {
            return true;
        }
        return false;
    } catch (error) {
        throw new Error("Falha ao excluir matéria");
    }
}


async function getSubjectById(idMateria: string): Promise<any> {
    try {
        const response = await db.query(
            "SELECT * FROM materia WHERE id_materia = $1",
            [idMateria]
        );

        return response.rows[0];
    } catch (error) {
        throw new Error("Falha ao buscar matéria");
    }
}

async function addSubjectToClass(id_turma: string, idMateria: string): Promise<void> {
    try {
        await db.query(
            `INSERT INTO materiaturma (id_turma, id_materia)
             VALUES ($1, $2)`,
            [id_turma, idMateria]
        );
    } catch (error) {
        console.error('Erro ao adicionar matéria ao curso:', error);
        throw new Error('Erro ao associar matéria ao curso');
    }
}
async function studentListBySubject(id_materia : string): Promise< any > {
    try {
        const response = await db.query(
            `SELECT p.nome, m.id
            FROM alunos p
            INNER JOIN matricula m ON p.id_aluno = m.id_aluno
            INNER JOIN materiaturma mt ON m.id_materia = mt.id_materia
            WHERE mt.id_materia = $1`,
            [id_materia]
        );
    }catch (error) {
        console.error('Erro ao buscar alunos matriculados na materia:', error)
        throw new Error('Erro ao buscar alunos matriculados na matéria')
   
}}


export const materiaService = {
    createSubject: (
        idMateria: string,
        nomeMatéria: string,
        cargaHorária: string,
        dataInício: Date,
        dataFim: Date,
        idProfessor: string,
        ementa: string,
        idCurso: string
    ) => createSubject(nomeMatéria,
        cargaHorária,
        dataInício,
        dataFim,
        idProfessor,
        idMateria,
        ementa,
        idCurso),
    updateSubject: (
        idMateria: string,
        idCurso: string,
        nomeMatéria: string,
        cargaHorária: string,
        dataInício: Date,
        dataFim: Date,
        idProfessor: string,
        ementa: string
    ) => updateSubject(idMateria,
        idCurso,
        idProfessor,
        nomeMatéria,
        cargaHorária,
        dataInício,
        dataFim,
        ementa),

    deleteSubject: (idMateria: string) => deleteSubject(idMateria),
    getSubjectById: (idMateria: string) => getSubjectById(idMateria),
    addSubjectToClass: (idCurso: string, idMateria: string) => addSubjectToClass(idCurso, idMateria),
    studentListBySubject: (id_materia: string) => studentListBySubject(id_materia)
};
