import { db } from '../config/database'

async function getNotesByStudentId(
  studentId: number
): Promise<string | { idAluno: number; nota: string | number }[]> {
  try {
    if (!studentId) return 'id_aluno é obrigatório para buscar as notas.'

    const result = await db.query(
      'SELECT id_aluno, nota FROM atividade_aluno WHERE id_aluno = $1',
      [studentId]
    )

    if (result.rows.length === 0) {
      return 'Nenhuma nota encontrada para este aluno.'
    }

    const groupedNotes: Record<number, string[]> = {}

    result.rows.forEach((row: any) => {
      if (row.nota != null) {
        if (!groupedNotes[row.id_aluno]) {
          groupedNotes[row.id_aluno] = []
        }
        groupedNotes[row.id_aluno].push(row.nota.toString())
      }
    })

    const notes = Object.keys(groupedNotes).map((idAluno) => ({
      idAluno: Number(idAluno),
      nota: groupedNotes[Number(idAluno)].join(', '),
    }))

    return notes
  } catch (error) {
    console.error('Erro ao buscar notas:', error)
    return 'Erro ao buscar notas'
  }
}

async function getNotesBySubject(
  subjectId: number
): Promise<
  (string | { idAluno: number; nota: string | number; media: number })[]
> {
  try {
    const result = await db.query(
      'SELECT id_aluno, nota FROM atividade_aluno WHERE id_materia = $1',
      [subjectId]
    )

    if (result.rows.length === 0) {
      return []
    }

    const groupedNotes: Record<number, string[]> = {}

    result.rows.forEach((row: any) => {
      if (row.nota != null) {
        if (!groupedNotes[row.id_aluno]) {
          groupedNotes[row.id_aluno] = []
        }
        groupedNotes[row.id_aluno].push(row.nota.toString())
      }
    })

    // Calculando a média de cada aluno para a matéria
    const notes = Object.keys(groupedNotes).map((idAluno) => {
      const alunoNotas = groupedNotes[Number(idAluno)].map((nota) =>
        parseFloat(nota)
      )
      const average = alunoNotas.length
        ? parseFloat(
            (
              alunoNotas.reduce((acc, cur) => acc + cur, 0) / alunoNotas.length
            ).toFixed(2)
          )
        : NaN

      return {
        idAluno: Number(idAluno),
        nota: groupedNotes[Number(idAluno)].join(', '),
        media: average,
      }
    })

    return notes
  } catch (error) {
    console.error('Erro ao buscar notas para a matéria:', error)
    return []
  }
}
async function getAverageByStudentAndSubject(
  subjectId: number
): Promise<{ idAluno: number; nomeAluno: string; media: number }[]> {
  try {
    const result = await db.query(
      `
      SELECT a.id_aluno, a.nome, AVG(aa.nota) AS media
      FROM atividade_aluno aa
      JOIN alunos a ON aa.id_aluno = a.id_aluno
      WHERE aa.id_materia = $1
      GROUP BY a.id_aluno, a.nome
      `,
      [subjectId]
    )

    if (result.rows.length === 0) {
      console.error('Nenhuma nota encontrada ou média não calculada.')
      return []
    }

    const notes = result.rows.map((row: any) => ({
      idAluno: row.id_aluno,
      nomeAluno: row.nome,
      media:
        row.media !== null ? parseFloat(parseFloat(row.media).toFixed(2)) : NaN,
    }))

    return notes
  } catch (error) {
    console.error('Erro ao calcular a média para os alunos da matéria:', error)
    return []
  }
}

async function getAverageBySubject(subjectId: number): Promise<number> {
  try {
    const result = await db.query(
      'SELECT AVG(nota) AS media FROM atividade_aluno WHERE id_materia = $1',
      [subjectId]
    )

    if (result.rows.length === 0 || result.rows[0].media === null) {
      return NaN
    }

    const average = parseFloat(result.rows[0].media)
    return parseFloat(average.toFixed(2))
  } catch (error) {
    console.error('Erro ao calcular a média das notas para a matéria:', error)
    return NaN
  }
}

export const notaService = {
  getNotesByStudentId: (studentId: number) => getNotesByStudentId(studentId),
  getAverageByStudentAndSubject: (subjectId: number) =>
    getAverageByStudentAndSubject(subjectId),
  getNotesBySubject: (subjectId: number) => getNotesBySubject(subjectId),
  getAverageBySubject: (subjectId: number) => getAverageBySubject(subjectId),
}
