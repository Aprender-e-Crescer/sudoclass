import { db } from '../config/database'

async function createPedagogue(
  id_pedagogo: string,
  nome: string,
  cpf: string,
  senha: string,
  contato: string
): Promise<any> {
  try {
    if (!nome || !cpf || !senha || !contato) {
      return 'Nome, CPF, senha e contato são obrigatórios.'
    }

    console.log('Iniciando criação de pedagogo com os dados:', {
      id_pedagogo,
      nome,
      cpf,
      senha,
      contato,
    })

    const response = await db.query(
      `INSERT INTO pedagogo (id_pedagogo, nome, cpf, senha, contato) VALUES ($1, $2, $3, $4, $5)`,
      [id_pedagogo, nome, cpf, senha, contato]
    )

    if (response.rows.length === 0) {
      console.error('Erro ao cadastrar pedagogo: Nenhum dado retornado.')
      return 'Erro ao cadastrar pedagogo.'
    }

    console.log('Pedagogo criado com sucesso:', response.rows[0])
    return response.rows[0]
  } catch (error: any) {
    console.error('Erro ao cadastrar pedagogo:', error)
    return `Erro ao cadastrar pedagogo. Detalhes: ${error.message}`
  }
}

async function updatePedagogue(
  id: string,
  nome: string,
  cpf: string,
  senha: string,
  contato: string
): Promise<any> {
  try {
    if (!id || !nome || !cpf || !senha || !contato) {
      console.error('ID, nome, CPF, senha e contato são obrigatórios.')
      return 'ID, nome, CPF, senha e contato são obrigatórios.'
    }

    console.log('Iniciando atualização de pedagogo:', {
      id,
      nome,
      cpf,
      senha,
      contato,
    })

    const pedagogo = await getPedagogue(id)
    if (!pedagogo || typeof pedagogo === 'string') {
      console.error('Nenhum pedagogo encontrado com o ID:', id)
      return 'ID não encontrado no banco. Não é possível atualizar o pedagogo.'
    }

    const response = await db.query(
      `UPDATE pedagogo SET nome = $1, cpf = $2, senha = $3, contato = $4 WHERE id_pedagogo = $5 RETURNING *`,
      [nome, cpf, senha, contato, id]
    )

    if (response.rows.length === 0) {
      console.error('Erro ao atualizar pedagogo: Nenhum dado retornado.')
      return 'Erro ao atualizar pedagogo.'
    }

    console.log('Pedagogo atualizado:', response.rows[0])
    return response.rows[0]
  } catch (error: any) {
    console.error('Erro ao atualizar pedagogo:', error)
    return `Erro ao atualizar pedagogo. Detalhes: ${error.message}`
  }
}

async function deletePedagogue(id: string): Promise<string> {
  try {
    if (!id) {
      console.error('ID é obrigatório para deletar o pedagogo.')
      return 'ID é obrigatório para deletar o pedagogo.'
    }

    const pedagogo = await getPedagogue(id)
    if (!pedagogo || typeof pedagogo === 'string') {
      console.error('Nenhum pedagogo encontrado com o ID:', id)
      return 'ID não encontrado no banco. Nenhum pedagogo para deletar.'
    }

    await db.query('DELETE FROM pedagogo WHERE id_pedagogo = $1', [id])

    console.log('Pedagogo deletado com sucesso.')
    return 'Pedagogo deletado com sucesso.'
  } catch (error: any) {
    console.error('Erro ao deletar pedagogo:', error)
    return `Erro ao deletar pedagogo. Detalhes: ${error.message}`
  }
}

async function getPedagogue(id: string): Promise<any> {
  try {
    if (!id) {
      console.error('ID é obrigatório para buscar o pedagogo.')
      return 'ID é obrigatório para buscar o pedagogo.'
    }

    console.log('Buscando pedagogo com ID:', id)

    const response = await db.query(
      'SELECT * FROM pedagogo WHERE id_pedagogo = $1',
      [id]
    ) // Correção aqui: `$1` é o placeholder correto para o ID

    if (response.rows.length === 0) {
      console.error('Nenhum pedagogo encontrado com o ID:', id)
      return 'ID não encontrado no banco.'
    }

    console.log('Pedagogo encontrado:', response.rows[0])
    return response.rows[0]
  } catch (error: any) {
    console.error('Erro ao buscar pedagogo:', error)
    return `Erro ao buscar pedagogo. Detalhes: ${error.message}`
  }
}

export const pedagogoService = {
  createPedagogue: (
    id_pedagogo: string,
    nome: string,
    cpf: string,
    senha: string,
    contato: string
  ) => createPedagogue(id_pedagogo, nome, cpf, senha, contato),
  updatePedagogue: (
    id: string,
    nome: string,
    cpf: string,
    senha: string,
    contato: string
  ) => updatePedagogue(id, nome, cpf, senha, contato),
  deletePedagogue: (id: string) => deletePedagogue(id),
  getPedagogue: (id: string) => getPedagogue(id),
}
