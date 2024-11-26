import { Request, Response } from "express";
import { teacherService } from "../services/teacher.service";

const teachersController = {
  createTeacher: async (req: Request, res: Response): Promise<void> => {
    const {
      id_professor,
      nome,
      datanasc,
      email,
      estado,
      municipio,
      rua,
      bairro,
      numero,
      rg,
      cpf,
      datadeexpedicaorg,
      estadodeexpedicaorg,
      estadonascimento,
      cidadedenascimento,
    } = req.body;
    try {
      const retorno = await teacherService.createTeacher(
        id_professor,
        nome,
        datanasc,
        email,
        estado,
        municipio,
        rua,
        bairro,
        numero,
        rg,
        cpf,
        datadeexpedicaorg,
        estadodeexpedicaorg,
        estadonascimento,
        cidadedenascimento
      );
      if (!retorno) {
        res.status(500).send("Não foi possível cadastrar o professor.");
      } else {
        res.status(200).send(retorno);
      }
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar cadastrar o professor.");
    }
  },

  updateTeacher: async (req: Request, res: Response): Promise<void> => {
    const {
      nome,
      datanasc,
      email,
      estado,
      municipio,
      rua,
      bairro,
      numero,
      rg,
      cpf,
      datadeexpedicaorg,
      estadodeexpedicaorg,
      estadonascimento,
      cidadedenascimento,
    } = req.body;
    const { id } = req.params;
    try {
      const ret = await teacherService.updateTeacher(
        id,
        nome,
        datanasc,
        email,
        estado,
        municipio,
        rua,
        bairro,
        numero,
        rg,
        cpf,
        datadeexpedicaorg,
        estadodeexpedicaorg,
        estadonascimento,
        cidadedenascimento
      );
      if (!ret) {
        res.status(500).send("Não foi possível atualizar o professor.");
      } else {
        res.status(200).send(ret);
      }
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar atualizar o professor.");
    }
  },

  deleteTeacher: async (req: Request, res: Response): Promise<void> => {
    const { idteacher } = req.params;
    try {
      const ret = await teacherService.deleteTeacher(idteacher);
      if (!ret) {
        res.status(500).send("Não foi possível excluir o professor.");
      } else {
        res.status(200).send(ret);
      }
    } catch (error) {
      console.error("Erro ao excluir professor:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar excluir o professor.");
    }
  },

  getTeacher: async (req: Request, res: Response): Promise<void> => {
    const { idteacher } = req.params;
    try {
      const ret = await teacherService.getTeacher(idteacher);
      if (!ret) {
        res.status(500).send("Não foi possível buscar o professor.");
      } else {
        res.status(200).send(ret);
      }
    } catch (error) {
      console.error("Erro ao buscar professor:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar buscar o professor.");
    }
  },

  getAllTeachers: async (req: Request, res: Response): Promise<void> => {
    try {
      const ret = await teacherService.getAllTeachers();
      if (!ret) {
        res.status(500).send("Não foi possível buscar os professores.");
      } else {
        res.status(200).send(ret);
      }
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar buscar os professores.");
    }
  },
};

export default teachersController;
