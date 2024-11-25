import { db } from '../config/database'
async function createComment(
  userId: number,
  activityId: number,
  message: string
): Promise<string> {
  try {
    if (!message) {
      return 'A mensagem não pode ser vazia.'
    }

    const userResult = await db.query(
      'SELECT id_usuario FROM usuario WHERE id_usuario = $1',
      [userId]
    )
    if (userResult.rows.length === 0) {
      return 'Usuário não encontrado.'
    }

    const activityResult = await db.query(
      'SELECT id_atividade FROM atividade WHERE id_atividade = $1',
      [activityId]
    )
    if (activityResult.rows.length === 0) {
      return 'Atividade não encontrada.'
    }

    const commentResult = await db.query(
      `INSERT INTO comentario (id_usuario, mensagem) 
       VALUES ($1, $2) RETURNING id_comentario`,
      [userId, message]
    )

    const commentId = commentResult.rows[0]?.id_comentario

    if (!commentId) {
      console.error('Erro ao criar o comentário, id_comentario não retornado.')
      return 'Erro ao criar o comentário.'
    }

    await db.query(
      `INSERT INTO comentario_atividade (id_atividade, id_comentario) 
       VALUES ($1, $2)`,
      [activityId, commentId]
    )

    return 'Comentário criado com sucesso.'
  } catch (error: any) {
    console.error('Erro ao criar comentário:', error.message)
    return 'Erro ao criar comentário.'
  }
}

async function getComments(activityId: number): Promise<any> {
  try {
    const result = await db.query(
      `SELECT * FROM comentario_atividade WHERE id_atividade = $1`,
      [activityId]
    )

    if (result.rows.length === 0) {
      return 'Nenhum comentário encontrado para essa atividade.'
    }

    return result.rows
  } catch (error) {
    console.error('Erro ao buscar comentários:', error)
    return 'Erro ao buscar comentários.'
  }
}

async function updateComment(
  commentId: number,
  newMessage: string
): Promise<string> {
  try {
    if (!newMessage) {
      return 'A mensagem não pode ser vazia.'
    }

    const result = await db.query(
      `UPDATE comentario
       SET mensagem = $1
       WHERE id_comentario = $2
       RETURNING id_comentario`,
      [newMessage, commentId]
    )

    if (result.rows.length === 0) {
      return 'Comentário não encontrado.'
    }

    return 'Comentário atualizado com sucesso.'
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error)
    return 'Erro ao atualizar comentário.'
  }
}

async function deleteComment(commentId: number): Promise<string> {
  try {
    await db.query(
      `DELETE FROM comentario_atividade WHERE id_comentario = $1`,
      [commentId]
    )

    const result = await db.query(
      `DELETE FROM comentario WHERE id_comentario = $1 RETURNING id_comentario`,
      [commentId]
    )

    if (result.rows.length === 0) {
      return 'Comentário não encontrado.'
    }

    return 'Comentário excluído com sucesso.'
  } catch (error) {
    console.error('Erro ao excluir comentário:', error)
    return 'Erro ao excluir comentário.'
  }
}

export const commentService = {
  createComment: (userId: number, activityId: number, message: string) =>
    createComment(userId, activityId, message),
  getComments: (activityId: number) => getComments(activityId),
  updateComment: (commentId: number, newMessage: string) =>
    updateComment(commentId, newMessage),
  deleteComment: (commentId: number) => deleteComment(commentId),
}
