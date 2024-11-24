import { db } from '../config/database'

async function criarCurso(
  idCurso: string,
  nomeCurso: string,
  cargaHoraria: string,
  dataInicio: Date,
  dataFim: Date,
  dataInicioInscricoes: Date,
  dataFimInscricoes: Date,
  numeroVagas: number,
  ementa: string
): Promise<string> {
  try {
    if (!idCurso || !nomeCurso || !cargaHoraria || !dataInicio || !dataFim || !dataInicioInscricoes || !dataFimInscricoes || numeroVagas === undefined || !ementa) {
      return "Todos os dados são obrigatórios"
    }

    const query = `
      INSERT INTO curso (
        id_curso, nome_curso, carga_horaria, datainicio, datafim, 
        datainicioinscricoes, datafiminscricoes, numerovagas, ementa
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `
    const valores = [
      idCurso,
      nomeCurso,
      cargaHoraria,
      dataInicio,
      dataFim,
      dataInicioInscricoes,
      dataFimInscricoes,
      numeroVagas,
      ementa
    ]

    await db.query(query, valores)
    return `Curso ${nomeCurso} criado com sucesso!`
  } catch (error) {
    console.error("Erro ao criar curso:", error)
    return "Erro ao criar curso"
  }
}

async function deletarCurso(idCurso: string): Promise<string> {
  try {
    if (!idCurso) {
      return "ID do curso é obrigatório";
    }

    const queryDeletar = 'DELETE FROM curso WHERE id_curso = $1';
    await db.query(queryDeletar, [idCurso]);

    return `Curso com ID ${idCurso} deletado com sucesso`;
  } catch (error) {
    console.error("Erro ao deletar curso:", error);
    return "Erro ao deletar curso";
  }
}

async function atualizarCurso(
  idCurso: string,
  nomeCurso: string,
  cargaHoraria: string,
  dataInicio: Date,
  dataFim: Date,
  dataInicioInscricoes: Date,
  dataFimInscricoes: Date,
  numeroVagas: number,
  ementa: string
): Promise<string> {
  try {
    if (!idCurso || !nomeCurso || !cargaHoraria || !dataInicio || !dataFim || !dataInicioInscricoes || !dataFimInscricoes || numeroVagas === undefined || !ementa) {
      return "Todos os dados são obrigatórios"
    }

     const cursoExiste = await verificarIdExistente(idCurso)
     if (!cursoExiste) {
       return "ID invalido: Curso nao encontrado"
     }

    const query = `
      UPDATE cursos
      SET nome_curso = $1, carga_horaria = $2, data_inicio = $3, data_fim = $4, 
          data_inicio_inscricoes = $5, data_fim_inscricoes = $6, numero_vagas = $7, ementa = $8
      WHERE id_curso = $9
    `
    const valores = [
      nomeCurso,
      cargaHoraria,
      dataInicio,
      dataFim,
      dataInicioInscricoes,
      dataFimInscricoes,
      numeroVagas,
      ementa,
      idCurso
    ]

    await db.query(query, valores)
    return `Curso com ID ${idCurso} atualizado com sucesso!`
  } catch (error) {
    console.error("Erro ao atualizar curso:", error)
    return "Erro ao atualizar curso"
  }
}

async function buscarCursoPorId(idCurso: string): Promise<string> {
  try {
    if (!idCurso) {
      return "ID do curso é obrigatório"
    }

    const query = 'SELECT * FROM curso WHERE id_curso = $1'
    const resultado = await db.query(query, [idCurso])

    if (resultado.rows.length === 0) {
      return "Curso não encontrado"
    }

    const curso = resultado.rows[0]
    return `Curso encontrado: ${curso.nome_curso}`
  } catch (error) {
    console.error("Erro ao buscar curso:", error)
    return "Erro ao buscar curso"
  }
}



async function verificarIdExistente(idCurso: string): Promise<boolean> {
 


  const queryVerificar = "SELECT * FROM curso WHERE id_curso = $1"

  const resultado = await db.query(queryVerificar, [parseInt(idCurso)])

  
  if (resultado.rows.length === 0){
    return false
  }
  else{
    return true
  }
  
}




export const cursoService = {
  criarCurso,
  deletarCurso,
  atualizarCurso,
  buscarCursoPorId,
  verificarIdExistente

}
