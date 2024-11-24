import { db } from '../config/database'

async function createWarning(
  mensagem: string,
  id_materia: number,
  id_usuario: number
): Promise<string> {
  console.log('createWarning chamada')
  if (!mensagem) {
    return 'Digite uma mensagem.'
  }

  try {
    const result = await db.query(
      'INSERT INTO aviso (mensagem, id_materia, id_usuario) VALUES ($1, $2, $3) RETURNING id_aviso',
      [mensagem, id_materia, id_usuario]
    )
    return `Aviso criado com sucesso, ID: ${result.rows[0].id_aviso}`
  } catch (error) {
    console.error('Erro ao criar aviso:', error)
    return 'Erro ao criar aviso'
  }
}

async function updateWarning(
  id_aviso: number,
  mensagem: string
): Promise<string> {
  if (!mensagem) {
    return 'Digite uma mensagem.'
  }

  try {
    const result = await db.query(
      'UPDATE aviso SET mensagem = $1 WHERE id_aviso = $2 RETURNING id_aviso',
      [mensagem, id_aviso]
    )
    if (result.rowCount === 0) {
      return 'Aviso não encontrado para atualização.'
    }
    return `Aviso atualizado com sucesso, ID: ${result.rows[0].id_aviso}`
  } catch (error) {
    console.error('Erro ao atualizar aviso:', error)
    return 'Erro ao atualizar aviso'
  }
}

async function getWarnings(id_materia: number) {
  try {
    const result = await db.query('SELECT * FROM aviso WHERE id_materia = $1', [
      id_materia,
    ])
    if (result.rows.length === 0) {
      return null
    }
    return result.rows[0]
  } catch (error) {
    console.error('Erro ao buscar aviso:', error)
    throw new Error('Erro ao buscar aviso')
  }
}

async function deleteWarning(id_aviso: number): Promise<string> {
  try {
    const result = await db.query('DELETE FROM aviso WHERE id_aviso = $1', [
      id_aviso,
    ])
    if (result.rowCount === 0) {
      return 'Aviso não encontrado para exclusão.'
    }
    return 'Aviso deletado com sucesso.'
  } catch (error) {
    console.error('Erro ao deletar aviso:', error)
    return 'Erro ao deletar aviso'
  }
}

export const warningService = {
  createWarning: (message: string, id_materia: number, id_usuario: number) =>
    createWarning(message, id_materia, id_usuario),
  updateWarning,
  getWarnings: (subjectId: number) => getWarnings(subjectId),
  deleteWarning,
}
