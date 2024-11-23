import { Request, Response } from 'express'
import { formService } from '../services/form.service'

const formController = {
  createForm: async (req: Request, res: Response): Promise<void> => {
    const { id, id_usuario, link, nome, data_criacao } = req.body;
  
    if (!id || !id_usuario || !link || !nome || !data_criacao) {
      res.status(400).send('Todos os campos são obrigatórios.');
      return;
    }
  
    try {
      const ret = await formService.createForm(id, id_usuario, data_criacao, link, nome);
  
      if (!ret) {
        res.status(500).send('Não foi possível criar o formulário.');
      } else {
        res.status(201).send('Formulário criado com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao criar formulário:', error);
      res.status(500).send('Ocorreu um erro no servidor ao tentar criar o formulário.');
    }
  },

  updateForm: async (req: Request, res: Response): Promise<void> => {
    const { link, nome } = req.body
    const id = Number(req.params.id)

    try {
      const ret = await formService.updateForm(id, link, nome)

      if (ret === undefined) {
        res.status(500).send('Não foi possível atualizar o formulario.')
      } else {
        res.status(200).send('Atualização realizada com sucesso')
      }
    } catch (error) {
      console.error('Erro ao atualizar formulario:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar atualizar o formulario.')
    }
  },

  deleteForm: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)

    try {
      const ret = await formService.deleteForm(id)
      if (ret === undefined) {
        res.status(500).send('Não foi possível apagar o formulario.')
      } else {
        res.status(200).send('Formulario removido com sucesso')
      }
    } catch (error) {
      console.error('Erro ao apagar formulario:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar remover o formulario.')
    }
  },

  getFormById: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)

    try {
      const ret = await formService.getFormById(id)

      if (ret === undefined || !ret.rows) {
        res.status(500).send('Não foi possível buscar o formulario.')
      } else {
        res.status(200).json(ret.rows[0])
      }
    } catch (error) {
      console.error('Erro ao buscar formulario:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar buscar o formulario.')
    }
  },

  getAllForms: async (req: Request, res: Response): Promise<void> => {
    try {
      const ret = await formService.getAllForms()

      if (ret === undefined) {
        res.status(500).send('Não foi possível buscar os formularios.')
      } else {
        res.status(200).json(ret)
      }
    } catch (error) {
      console.error('Erro ao buscar formularios:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar buscar formularios.')
    }
  },
}

export default formController
