import { db } from '../config/database'

async function createPresenceJustification(
  id_chamada: number,
  justificativa: string,
  image_url?: string
) {
  try {
    const query = `
      INSERT INTO justificativa_falta (id_chamada, justificativa, image_url)
      VALUES ($1, $2, $3)
      RETURNING *
    `
    const values = [id_chamada, justificativa, image_url || null]
    const result = await db.query(query, values)

    return result.rows[0]
  } catch (error) {
    console.error('Erro ao criar justificativa de falta:', error)
    return false
  }
}

async function getPresenceJustificationById(id: number) {
  if (!id) {
    return console.log('Id é obrigatório')
  }

  try {
    const query = `
      SELECT jf.id, jf.id_chamada, jf.justificativa, c.*
      FROM justificativa_falta jf
      INNER JOIN chamada c ON jf.id_chamada = c.id
      WHERE jf.id = $1
    `
    const result = await db.query(query, [id])

    if (result.rows.length === 0) {
      console.log('Nenhuma justificativa de falta encontrada com esse ID')
      return null
    }

    return result.rows[0]
  } catch (error) {
    console.error(
      'Erro ao pegar a justificativa de falta e chamada pelo id:',
      error
    )
  }
}

async function getAllPresenceJustifications() {
  try {
    const query = `
      SELECT jf.id, jf.id_chamada, jf.justificativa, c.*
      FROM justificativa_falta jf
      INNER JOIN chamada c ON jf.id_chamada = c.id
    `
    const result = await db.query(query)

    if (result.rows.length === 0) {
      console.log('Nenhuma justificativa de falta encontrada')
      return null
    }

    return result.rows
  } catch (error) {
    console.error('Erro ao pegar as justificativas de falta:', error)
  }
}

async function deletePresenceJustification(id: number) {
  try {
    if (!id) {
      return console.log('Id é obrigatório')
    }

    const query = 'DELETE FROM justificativa_falta WHERE id = $1'
    await db.query(query, [id])

    return true
  } catch (error) {
    console.error('Erro ao deletar justificativa de falta:', error)
  }
}

async function updatePresenceJustification(
  id: number,
  id_chamada: number,
  justificativa: string,
  image_url?: string
) {
  try {
    const query = `
      UPDATE justificativa_falta
      SET id_chamada = $1, justificativa = $2, image_url = $3
      WHERE id = $4
    `
    const values = [id_chamada, justificativa, image_url || null, id]

    await db.query(query, values)

    return values
  } catch (error) {
    console.error('Erro ao atualizar justificativa de falta:', error)
  }
}
export const PresenceJustificationService = {
  createJustification: createPresenceJustification,
  getJustificationById: getPresenceJustificationById,
  getAllJustifications: getAllPresenceJustifications,
  updateJustification: updatePresenceJustification,
  deleteJustification: deletePresenceJustification,
}
