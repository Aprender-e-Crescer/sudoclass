import { db } from '../config/database'

async function createActivity(
  title: string,
  description: string,
  value: string,
  deliveryDate: Date,
  subjectId: number,
  attachment: string
): Promise<string> {
  console.log('Função createActivity chamada')

  try {
    if (!title || !description || !value || !deliveryDate || !subjectId) {
      console.log('Campos obrigatórios faltando!')
      return 'Todos os campos são obrigatórios.'
    }

    const matriceStudents = (await db.query(`SELECT id_aluno FROM alunos`)).rows
    console.log('Estudantes encontrados:', matriceStudents)

    const createdAt = new Date()
    const offset = createdAt.getTimezoneOffset()
    createdAt.setMinutes(createdAt.getMinutes() - offset)

    const createdAtString = createdAt.toISOString().split('T')[0]

    const result = await db.query(
      `INSERT INTO atividade (titulo, descricao, valor, data_entrega, data_postagem, id_materia, anexo) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_atividade`,
      [
        title,
        description,
        value,
        deliveryDate,
        createdAtString,
        subjectId,
        attachment,
      ]
    )

    const activityId = result.rows[0]?.id_atividade

    if (!activityId) {
      console.error('Erro: Não foi possível obter o id_atividade')
      return 'Erro ao cadastrar atividade'
    }

    console.log('ID da atividade criada:', activityId)

    for (const student of matriceStudents) {
      const studentActivityResult = await db.query(
        `INSERT INTO atividade_aluno (id_aluno, id_atividade, id_materia)
          VALUES ($1, $2, $3) RETURNING id_atividade_aluno`,
        [student.id_aluno, activityId, subjectId]
      )

      const studentActivityId =
        studentActivityResult.rows[0]?.id_atividade_aluno

      if (!studentActivityId) {
        console.error('Erro: Não foi possível obter o id_atividade_aluno')
        continue
      }

      const notaAtividadeResult = await db.query(
        `INSERT INTO nota_atividade (id_atividade_aluno, nota, id_atividade)
          VALUES ($1, $2, $3) RETURNING id_nota_atividade`,
        [studentActivityId, null, activityId]
      )

      const idNotaAtividade = notaAtividadeResult.rows[0]?.id_nota_atividade

      if (!idNotaAtividade) {
        console.error('Erro: Não foi possível obter o id_nota_atividade')
        continue
      }

      await db.query(
        `UPDATE atividade_aluno
         SET id_nota_atividade = $1
         WHERE id_atividade_aluno = $2`,
        [idNotaAtividade, studentActivityId]
      )
    }

    return `Atividade criada com sucesso. ID: ${activityId}`
  } catch (error) {
    console.error('Erro ao cadastrar atividade:', error)
    return 'Erro ao cadastrar atividade'
  }
}

async function getLinkFromActivity(
  activityId: number,
  studentId: number
): Promise<any> {
  try {
    const result = await db.query(
      `SELECT anexos FROM atividade_aluno WHERE id_atividade = $1 AND id_aluno = $2`,
      [activityId, studentId]
    )
    if (result.rows.length === 0) {
      console.warn('Nenhum link encontrado para a atividade do aluno.')
      return null
    }

    return result.rows[0].anexos
  } catch (err) {
    console.error('Erro ao buscar link da atividade do aluno:', err)
  }
}
async function updateActivity(
  title: string,
  description: string,
  value: string,
  deliveryDate: Date,
  activityId: number,
  attachment: string
): Promise<string> {
  try {
    if (!activityId || !value || !deliveryDate || !title || !description) {
      return 'ID da atividade é obrigatório.'
    }
    const result = await db.query(
      `UPDATE atividade
       SET titulo = $1, descricao = $2, valor = $3, data_entrega = $4, anexo = $5
       WHERE id_atividade = $6`,
      [title, description, value, deliveryDate, attachment, activityId]
    )

    return `atividade atualizada com sucesso`
  } catch (err) {
    console.error('Erro ao atualizar atividade:', err)
    return 'Erro ao atualizar atividade'
  }
}

async function updateLinkActivity(
  activityId: number,
  studentId: number,
  attachment: string
): Promise<string> {
  try {
    if (!activityId || !studentId || !attachment) {
      return 'Parâmetros obrigatórios não fornecidos.'
    }

    await db.query(
      `UPDATE atividade_aluno 
       SET anexos = $1 
       WHERE id_atividade = $2 AND id_aluno = $3`,
      [attachment, activityId, studentId]
    )

    return 'Link atualizado com sucesso.'
  } catch (err) {
    console.error('Erro ao atualizar link da atividade do aluno:', err)
    return 'Erro ao atualizar link da atividade.'
  }
}

async function updateActivityGrades(
  activityId: number,
  studentId: number,
  grade: string
): Promise<string> {
  try {
    if (!grade) {
      return 'Nota é obrigatória.'
    }

    const studentActivityId = (
      await db.query(
        `SELECT id_atividade_aluno FROM atividade_aluno WHERE id_atividade = $1 AND id_aluno = $2`,
        [activityId, studentId]
      )
    ).rows
    console.log('estudantes:', studentId)

    if (studentActivityId.length === 0) {
      return 'Nenhum aluno encontrado para esta atividade.'
    }
    console.log('nota:', grade)
    console.log('id atividade aluno:', studentActivityId)

    for (const studentActivity of studentActivityId) {
      await db.query(
        `UPDATE nota_atividade
         SET nota = $1
         WHERE id_atividade_aluno = $2 AND id_atividade = $3`,
        [grade, studentActivity.id_atividade_aluno, activityId]
      )
      await db.query(
        `UPDATE atividade_aluno
         SET nota = $1
         WHERE id_atividade_aluno = $2 AND id_atividade = $3`,
        [grade, studentActivity.id_atividade_aluno, activityId]
      )
    }

    return `Notas atualizadas com sucesso para a atividade ID: ${activityId}.`
  } catch (error) {
    console.error('Erro ao atualizar atividades:', error)
    return 'Erro ao atualizar atividades'
  }
}
async function getActivityById(activityId: number): Promise<any> {
  try {
    const activityResult = await db.query(
      `SELECT *
       FROM atividade 
       WHERE id_atividade = $1`,
      [activityId]
    )

    console.log(activityResult)

    if (activityResult.rows.length === 0) {
      return 'Atividade não encontrada.'
    }
    const activity = activityResult.rows[0]

    return activity
  } catch (error) {
    console.error('Erro ao buscar atividade:', error)
    return 'Erro ao buscar atividade'
  }
}

async function getActivities(subjectId: number): Promise<any> {
  try {
    const activitiesResult = await await db.query(
      `SELECT *
       FROM atividade 
       WHERE id_materia = $1`,
      [subjectId]
    )
    console.log('Atividades retornadas do banco:', activitiesResult.rows)
    return activitiesResult.rows
  } catch (error) {
    console.error('Erro ao buscar atividades:', error)
    throw new Error('Erro ao buscar atividades')
  }
}

async function deleteActivity(activity_id: number): Promise<string> {
  try {
    await db.query(`DELETE FROM atividade_aluno WHERE id_atividade = $1`, [
      activity_id,
    ])
    await db.query(`DELETE FROM nota_atividade WHERE id_atividade = $1`, [
      activity_id,
    ])
    await db.query(`DELETE FROM atividade WHERE id_atividade = $1`, [
      activity_id,
    ])

    return `Atividade excluída com sucesso. ID: ${activity_id}`
  } catch (error) {
    console.error('Erro ao excluir atividade:', error)
    return 'Erro ao excluir atividade'
  }
}

export const activityService = {
  createActivity: (
    title: string,
    description: string,
    value: string,
    deliveryDate: Date,
    subjectId: number,
    attachment: string
  ) =>
    createActivity(
      title,
      description,
      value,
      deliveryDate,
      subjectId,
      attachment
    ),
  getLinkFromActivity: (activityId: number, studentId: number) =>
    getLinkFromActivity(activityId, studentId),
  updateLinkActivity: (
    activityId: number,
    studentId: number,
    attachment: string
  ) => updateLinkActivity(activityId, studentId, attachment),
  updateActivityGrades: (
    activityId: number,
    studentId: number,
    grade: string
  ) => updateActivityGrades(activityId, studentId, grade),
  deleteActivity: (activityId: number) => deleteActivity(activityId),
  getActivityById: (activityId: number) => getActivityById(activityId),
  getActivities: (subjectId: number) => getActivities(subjectId),
  updateActivity: (
    title: string,
    description: string,
    value: string,
    deliveryDate: Date,
    activityId: number,
    attachment: string
  ) =>
    updateActivity(
      title,
      description,
      value,
      deliveryDate,
      activityId,
      attachment
    ),
}
