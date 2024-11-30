import { db } from '../config/database'

async function createForm(
  id_usuario: number,
  data_criacao: string,
  link: string,
  nome: string
) {
  try {
    const query = `
      INSERT INTO formulario (id_usuario, data_criacao, link, nome)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const values = [id_usuario, data_criacao, link, nome]
    const result = await db.query(query, values)

    return result.rows[0]
  } catch (error) {
    console.error('Erro ao criar formulário:', error)
    return false
  }
}

async function getFormById(id: number) {
  if (!id) {
    return console.log('Id é obrigatório')
  }

  try {
    const query = `
      SELECT f.*, p.nome AS createdBy
      FROM formulario f
      INNER JOIN usuario u ON f.id_usuario = u.id_usuario
      INNER JOIN pedagogo p ON u.id_pedagogo = p.id_pedagogo
      WHERE u.tipo = 'pedagogo'
      AND f.id = $1
    `
    const result = await db.query(query, [id])

    if (result.rows.length === 0) {
      console.log('Nenhum formulário encontrado com esse ID')
      return null
    }

    return result.rows[0]
  } catch (error) {
    console.error('Erro ao pegar o formulário pelo id:', error)
  }
}

async function getAllForms() {
  try {
    const query = `
      SELECT f.*, p.nome AS createdBy
      FROM formulario f
      INNER JOIN usuario u ON f.id_usuario = u.id_usuario
      INNER JOIN pedagogo p ON u.id_pedagogo = p.id_pedagogo
      WHERE u.tipo = 'pedagogo'
    `
    const result = await db.query(query)
    return result.rows
  } catch (error) {
    console.error('Error ao pegar todos os formularios:', error)
  }
}

async function deleteForm(id: number) {
  try {
    const query = 'DELETE FROM formulario WHERE id = $1'
    await db.query(query, [id])
    if (!id) {
      return console.log('Id e obrigatorio')
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar o formulario:', error)
  }
}

async function updateForm(id: number, link: string, nome: string) {
  try {
    const query = `
  UPDATE formulario
  SET link = $1, nome = $2
  WHERE id = $3
`
    const values = [link, nome, id]

    await db.query(query, values)
    if (!nome || !link) {
      return console.log('Titulo e link sao obrigatorios')
    }

    return values
  } catch (error) {
    console.error('Erro ao atualizar o formulario:', error)
  }
}

export const formService = {
  createForm: async (
    id_usuario: number,
    data_criacao: string,
    link: string,
    nome: string
  ) => {
    return await createForm(id_usuario, data_criacao, link, nome)
  },

  getFormById: (id: number) => getFormById(id),
  getAllForms: () => getAllForms(),
  updateForm: (id: number, link: string, nome: string) =>
    updateForm(id, link, nome),
  deleteForm: (id: number) => deleteForm(id),
}
