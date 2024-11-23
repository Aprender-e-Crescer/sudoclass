import { db } from '../config/database'

async function getNotesByStudentId(
  studentId: number
): Promise<string | number[]> {
  try {
    if (!studentId) return 'id_aluno é obrigatório para buscar as notas.'

    const result = await db.query(
      `SELECT aa.nota FROM atividade_aluno aa WHERE aa.id_aluno = $1`,
      [studentId]
    )

    if (result.rows.length === 0)
      return 'Nenhuma nota encontrada para este aluno.'

    return result.rows.map((row) => row.nota).filter((nota) => nota != null)
  } catch (error) {
    console.error('Erro ao buscar notas:', error)
    return 'Erro ao buscar notas'
  }
}
async function getAverageByStudentId(studentId: number): Promise<number> {
  try {
    if (!studentId) {
      console.error('id_aluno é obrigatório para calcular a média.')
      return NaN
    }

    const result = await db.query(
      `SELECT AVG(aa.nota) AS media FROM atividade_aluno aa WHERE aa.id_aluno = $1`,
      [studentId]
    )

    if (result.rows.length === 0 || result.rows[0].media === null) {
      console.error('Nenhuma nota encontrada ou média não calculada.')
      return NaN
    }

    const average = parseFloat(result.rows[0].media)
    return parseFloat(average.toFixed(2))
  } catch (error) {
    console.error('Erro ao calcular a média:', error)
    return NaN
  }
}

export const notaService = {
  getNotesByStudentId: (studentId: number) => getNotesByStudentId(studentId),
  getAverageByStudentId: (studentId: number) =>
    getAverageByStudentId(studentId),
}
