import { db } from '../config/database'

async function createClass(
  id_turma: number,
  nome_turma: string,
  turno: string,
  cargahoraria: number,
  datainicio: Date,
  datafim: Date,
  ementa: string,
  dataFinalIncricao: Date,
  vagasincricoes: number
): Promise<string> {
  try {
    if (
      !id_turma ||
      !nome_turma ||
      !turno ||
      !cargahoraria ||
      !datainicio ||
      !datafim ||
      !ementa ||
      !dataFinalIncricao ||
      vagasincricoes === undefined
    ) {
      return 'Todos os campos sao obrigatorios para adicionar uma turma'
    }

    const idExistente = await verificaridExistente(id_turma)
    if (idExistente) {
      return `Ja existe uma turma com o ID ${id_turma}`
    }

    const response = await db.query(
      `INSERT INTO turmas 
       (id_turma, nome_turma, turno, carga_horaria, datainicio, datafim, ementa, datafinalinscricao, vagasinscricoes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING id_turma`,
      [
        id_turma,
        nome_turma,
        turno,
        cargahoraria,
        datainicio,
        datafim,
        ementa,
        dataFinalIncricao,
        vagasincricoes
      ]
    )

    return `A turma ${nome_turma} foi adicionada com sucesso! ID: ${response.rows[0].id_turma}, turno: ${turno}, inicio: ${datainicio.toISOString()}, termino: ${datafim.toISOString()}, carga horaria: ${cargahoraria}, ementa: "${ementa}", inscricoes ate: ${dataFinalIncricao.toISOString()}, vagas: ${vagasincricoes}.`
  } catch (error) {
    console.error('Erro ao adicionar turma:', error)
    return 'Erro ao adicionar turma. Tente novamente mais tarde.'
  }
}

async function updateClass(
  id_turma: number,
  nome_turma: string,
  turno: string,
  cargahoraria: number,
  datainicio: Date,
  datafim: Date,
  ementa: string,
  dataFinalIncricao: Date,
  vagasincricoes: number
): Promise<string> {
  try {
    if (
      !id_turma ||
      !nome_turma ||
      !turno ||
      !cargahoraria ||
      !datainicio ||
      !datafim ||
      !ementa ||
      !dataFinalIncricao ||
      vagasincricoes === undefined
    ) {
      return 'Todos os campos sao obrigatorios para atualizar uma turma'
    }

    await db.query(
      `UPDATE turmas 
       SET nome_turma = $1, turno = $2, carga_horaria = $3, datainicio = $4, datafim = $5, ementa = $6, datafinalinscricao = $7, vagasinscricoes = $8 
       WHERE id_turma = $9`,
      [nome_turma, turno, cargahoraria, datainicio, datafim, ementa, dataFinalIncricao, vagasincricoes, id_turma]
    )

    return `A turma ${nome_turma} (ID: ${id_turma}) foi atualizada com sucesso`
  } catch (error) {
    console.error('Erro ao atualizar turma:', error)
    return 'Erro ao atualizar turma. Tente novamente mais tarde'
  }
}

async function deleteClass(id_turma: number): Promise<string> {
  try {
    if (!id_turma) {
      return 'O ID da turma e obrigatorio para excluir uma turma'
    }

    const idExistente = await verificaridExistente(id_turma)
    if (!idExistente) {
      return `Nao foi encontrada nenhuma turma com o ID ${id_turma}`
    }

    await db.query('DELETE FROM turmas WHERE id_turma = $1', [id_turma])

    return `A turma com o ID ${id_turma} foi excluida com sucesso`
  } catch (error) {
    console.error('Erro ao excluir turma:', error)
    return 'Erro ao excluir turma. '
  }
}
async function getClassesbyid(id_turma: number): Promise<string> {
  try {
    if (!id_turma) {
      return 'O ID da turma e obrigatorio para buscar turmas'
    }
    const idExistente = await verificaridExistente(id_turma)
    if (!idExistente) {
      return `Nao foi encontrada nenhuma turma com o ID ${id_turma}`
    }
    await db.query(`SELECT FROM trumas WHERE id_turma = ${id_turma}`)
    return `Turmas com id: ${id_turma} encontradas com sucesso`
  } catch (error) {
      console.error('Erro ao buscar turmas:', error)
      return 'Erro ao buscar turmas'
    
}}



async function addStudentsToClass(studentIds: number[], turmaId: number): Promise<string> {
  try {
    if (studentIds.length === 0 || !turmaId) {
      return 'Todos os campos sao obrigatorios'
    }

    const idExistente = await verificaridExistente(turmaId)
    if (!idExistente) {
      return `Nao foi encontrada nenhuma turma com o ID ${turmaId}`
    }

    const values = studentIds.map((id) => `(${id}, ${turmaId})`).join(', ')
    const query = `INSERT INTO alunosTurma (id_aluno, id_turma) VALUES ${values}`

    await db.query(query)

    return `Os alunos com os IDs [${studentIds.join(', ')}] foram adicionados a turma ${turmaId}`
  } catch (error) {
    console.error('Erro ao adicionar alunos a turma:', error)
    return 'Erro ao adicionar alunos a turma'
  }
}

async function liststudentsinClass(id_turma: number): Promise<string> {
  try {
    if (!id_turma) {
      return 'O ID da turma e obrigatorio para listar alunos'
    }

    const idExistente = await verificaridExistente(id_turma)
    if (!idExistente) {
      return `Nao foi encontrada nenhuma turma com o ID ${id_turma}`
    }

    const result = await db.query(`SELECT id_aluno FROM alunosTurma WHERE id_turma = $1`, [id_turma])
    const studentIds = result.rows.map((row) => row.id_aluno)

    if (studentIds.length === 0) {
      return `Nenhum aluno encontrado na turma com ID ${id_turma}`
    }

    return `IDs dos alunos na turma ${id_turma}: [${studentIds.join(', ')}]`
  } catch (error) {
    console.error('Erro ao listar alunos na turma:', error)
    return 'Erro ao listar alunos na turma'
  }
}



async function verificaridExistente(id_turma: number): Promise<boolean> {
  try {
    const queryVerificar = 'SELECT 1 FROM turmas WHERE id_turma = $1'
    const result = await db.query(queryVerificar, [id_turma])
    return result.rows.length > 0
  } catch (error) {
    console.error('Erro ao verificar ID da turma:', error)
    return false
  }
}
async function listSubjectsInClass(turmaId: number): Promise<{ subjects: number[] }> {
  try {
    
    const idExiste = await verificaridExistente(turmaId);
    if (!idExiste) {
      throw new Error(`Turma ${turmaId} nao encontrada.`)
    }

    const result = await db.query(
      'SELECT id_materia FROM materiaturma WHERE id_turma = $1',
      [turmaId]
    );

    const subjectIds = result.rows.map((row) => row.id_materia);

    if (subjectIds.length === 0) {
      throw new Error('Nenhuma materia cadastrada para esta turma.');
    }

    return { subjects: subjectIds }
  } catch (error) {
    console.error('Erro ao listar matérias na turma:', error)
    throw error
  }
}




export const classesService = {
  createClass,
  updateClass,
  deleteClass,
  addStudentsToClass,
  verificaridExistente,
  getClassesbyid,
  liststudentsinClass,
  listSubjectsInClass
}
