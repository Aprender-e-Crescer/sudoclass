import { Request, Response } from "express";
import { teacherService } from "../services/teacher.service";

const teachersController = {
  createTeacher: async (req: Request, res: Response): Promise<void> => {
    const {
      idteacher,
      nome,
      cpf,
      email,
      telefone,
      estado,
      rua,
      bairro,
      municipio,
      numero,
      datadenascimento,
      RG,
      datadeespedicao,
      naturalidade,
    } = req.body;
    try {
      const retorno = await teacherService.createTeacher(
        idteacher,
        nome,
        cpf,
        email,
        telefone,
        estado,
        rua,
        bairro,
        municipio,
        numero,
        datadenascimento,
        RG,
        datadeespedicao,
        naturalidade
      );
      if (!retorno) {
        res.status(500).send("Não foi possível cadastrar o professor.");
      } else {
        res.status(200).send("Cadastro realizado com sucesso");
      }
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar cadastrar o professor.");
    }
  },

  updateTeacher: async (req: Request, res: Response): Promise<void> => {
    const {
      idteacher,
      nome,
      cpf,
      email,
      telefone,
      estado,
      rua,
      bairro,
      municipio,
      numero,
      datadenascimento,
      RG,
      datadeespedicao,
      naturalidade,
    } = req.body;
    const id = req.params.id;
    try {
      const ret = await teacherService.updateTeacher(
        idteacher,
        nome,
        cpf,
        email,
        telefone,
        estado,
        rua,
        bairro,
        municipio,
        numero,
        datadenascimento,
        RG,
        datadeespedicao,
        naturalidade
      );
      if (!ret) {
        res.status(500).send("Não foi possível atualizar o professor.");
      } else {
        res.status(200).send("Atualização realizada com sucesso");
      }
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar atualizar o professor.");
    }
  },

  deleteTeacher: async (req: Request, res: Response): Promise<void> => {
    const {
      idteacher,
      nome,
      cpf,
      email,
      telefone,
      estado,
      rua,
      bairro,
      municipio,
      numero,
      datadenascimento,
      RG,
      datadeespedicao,
      naturalidade,
    } = req.body;
    try {
      const ret = await teacherService.deleteTeacher(
        idteacher,
        nome,
        cpf,
        email,
        telefone,
        estado,
        rua,
        bairro,
        municipio,
        numero,
        datadenascimento,
        RG,
        datadeespedicao,
        naturalidade
      );
      if (!ret) {
        res.status(500).send("Não foi possível excluir o professor.");
      } else {
        res.status(200).send("Exclusão realizada com sucesso");
      }
    } catch (error) {
      console.error("Erro ao excluir professor:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar excluir o professor.");
    }
  },
};

export default teachersController;
