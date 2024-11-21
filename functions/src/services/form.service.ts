import { db } from '../config/database'

async function createForm(
  id: number,
  id_usuario: number,
  data_criacao: string,
  link: string,
  nome: string
) {
  try {
    const query = `
      INSERT INTO formulario (id, id_usuario, data_criacao, link, nome)
      VALUES ($1, $2, $3, $4, $5)
    `
    const values = [id, id_usuario, data_criacao, link, nome]
    await db.query(query, values)

    return values
  } catch (error) {
    console.error('Erro ao criar formulário:', error)
    return false
  }
}

async function getFormById(id: number) {
  try {
    const query = 'SELECT * FROM formulario WHERE id = $1'
    const result = await db.query(query, [id])
    if (!id) {
      return console.log('Id e obrigatorio')
    }
    return result
  } catch (error) {
    console.error('Error pegar o form pelo id:', error)
  }
}

async function getAllForms() {
  try {
    const query = 'SELECT * FROM formulario'
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
    id: number,
    id_usuario: number,
    data_criacao: string,
    link: string,
    nome: string
  ) => {
    return await createForm(id, id_usuario, data_criacao, link, nome)
  },

  getFormById: (id: number) => getFormById(id),
  getAllForms: () => getAllForms(),
  updateForm: (id: number, link: string, nome: string) =>
    updateForm(id, link, nome),
  deleteForm: (id: number) => deleteForm(id),
}
