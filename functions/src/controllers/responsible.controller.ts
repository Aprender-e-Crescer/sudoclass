import { Request, Response } from 'express';
import { responsibleService } from '../services/responsible.service'

export const responsibleController = {
    createResponsible: async (req: Request, res: Response): Promise<void> => {
        const { 
            id,
            tipo,
            nome,
            email,
            telefone,
            estado,
            municipio,
            rua,
            bairro,
            numero,
            dataNascimento, 
            cpf,
            rg,
            documentos } = req.body

            try {
                const retorno = await responsibleService.createResponsable(
                    id,
                    tipo,
                    nome,
                    email,
                    telefone,
                    estado,
                    municipio,
                    rua,
                    bairro,
                    numero,
                    dataNascimento, 
                    cpf,
                    rg,
                    documentos
                )
                if(!retorno) {
                    res.status(500).send('Erro ao cadastrar responsável')
                }
                else {
                    res.status(200).send(retorno);
                }
            } catch(error) {
                console.error(error)
            }
    },

    updateResponsible: async (req: Request, res: Response): Promise<void> => {
        const {
            tipo,
            nome,
            email,
            telefone,
            estado,
            municipio,
            rua,
            bairro,
            numero,
            dataNascimento, 
            cpf,
            rg,
            documentos } = req.body
            const {id} = req.params

            try {
                const retorno = await responsibleService.updateResponsible(
                    id,
                    tipo,
                    nome,
                    email,
                    telefone,
                    estado,
                    municipio,
                    rua,
                    bairro,
                    numero,
                    dataNascimento, 
                    cpf,
                    rg,
                    documentos
                )
                if(!retorno) {
                    res.status(500).send('Erro ao cadastrar responsável')
                }
                else {
                    res.status(200).send(retorno);
                }
            } catch(error) {
                console.error(error)
            }
    },

    deleteResponsible: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params

            try {
                const verificaId = await responsibleService.verificarIdExistente(id)

                if(!verificaId) {
                    res.status(400).send('O id não é válido')
                    return
                }

                const retorno = await responsibleService.deleteResponsible(id)
                

                if(!retorno) {
                    res.status(500).send('Erro ao deletar responsável')
                }
                else {
                    res.status(200).send(retorno);
                }
            } catch(error) {
                console.error(error)
            }
    },

    getResponsible: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params

            try {
                const verificaId = await responsibleService.verificarIdExistente(id)

                if(!verificaId) {
                    res.status(400).send('O id não é válido')
                    return
                }

                const retorno = await responsibleService.getResponsavel(id)
                

                if(!retorno) {
                    res.status(500).send('Erro ao listar responsável')
                }
                else {
                    res.status(200).send(retorno);
                }
            } catch(error) {
                console.error(error)
            }
    }
}