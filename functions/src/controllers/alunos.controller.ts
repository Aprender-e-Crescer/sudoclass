import { Request, Response } from "express";
import { alunoService } from "../services/alunos.service";

const alunosController = {
  createstudent: async (req: Request, res: Response): Promise<any> => {
    const {
      id_aluno,
      nome,
      email,
      data_nasc,
      estado,
      municipio,
      rua,
      bairro,
      numero,
      cpf,
      rg,
      datadeexpedicaorg,
      estadodeexpedicaorg,
      estadonascimento,
      cidadenascimento,

      id_responsavel,
      tipo_responsavel,
      nome_responsavel,
      email_responsavel,
      telefone_responsavel,
      estado_responsavel,
      municipio_responsavel,
      rua_responsavel,
      bairro_responsavel,
      numero_responsavel,
      dataNascimento_responsavel,
      cpf_responsavel,
      rg_responsavel,
      documentos_responsavel,
    } = req.body;

    try {
      const retorno = await alunoService.createStudent(
        id_aluno,
        nome,
        email,
        data_nasc,
        estado,
        municipio,
        rua,
        bairro,
        numero,
        cpf,
        rg,
        datadeexpedicaorg,
        estadodeexpedicaorg,
        estadonascimento,
        cidadenascimento,

        id_responsavel,
        tipo_responsavel,
        nome_responsavel,
        email_responsavel,
        telefone_responsavel,
        estado_responsavel,
        municipio_responsavel,
        rua_responsavel,
        bairro_responsavel,
        numero_responsavel,
        dataNascimento_responsavel,
        cpf_responsavel,
        rg_responsavel,
        documentos_responsavel
      );
      if (!retorno) {
        res.status(500).send("Não foi possível cadastrar o aluno.");
      } else {
        res.status(200).send(retorno);
      }
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar cadastrar o aluno.");
    }
  },

  updateStudent: async (req: Request, res: Response): Promise<void> => {
    const {
      nome,
      email,
      data_nasc,
      estado,
      municipio,
      rua,
      bairro,
      numero,
      cpf,
      rg,
      datadeexpedicaorg,
      estadodeexpedicaorg,
      estadonascimento,
      cidadenascimento,
    } = req.body;
    const { id } = req.params;
    try {
      const ret = await alunoService.updateStudent(
        id,
        nome,
        email,
        data_nasc,
        estado,
        municipio,
        rua,
        bairro,
        numero,
        rg,
        datadeexpedicaorg,
        estadodeexpedicaorg,
        estadonascimento,
        cidadenascimento,
        cpf
      );
      if (!ret) {
        res.status(500).send("Não foi possível atualizar o aluno.");
      } else {
        res.status(200).send(ret);
      }
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar atualizar o aluno.");
    }
  },

  deleteStudent: async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
      const ret = await alunoService.deleteStudent(id);
      if (!ret) {
        res.status(500).send("Não foi possível deletar o aluno.");
      } else {
        res.status(200).send("Aluno delatado com sucesso");
      }
    } catch (error) {
      console.error("Erro ao deltar o aluno:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar deletar o aluno.");
    }
  },

  getStudent: async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
      const ret = await alunoService.getStudent(id);
      if (!ret) {
        res.status(500).send("Não foi possível deletar o aluno.");
      } else {
        res.status(200).send(ret);
      }
    } catch (error) {
      console.error("Erro ao deltar o aluno:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar deletar o aluno.");
    }
  },
  getAllStudent: async (req: Request, res: Response): Promise<void> => {
    try {
      const ret = await alunoService.getAllStudent();
      if (!ret) {
        res.status(500).send("Não foi possível buscar os alunos.");
      } else {
        res.status(200).send(ret);
      }
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar buscar os alunos.");
    }
  },
  getDocStudent: async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
      const ret = await alunoService.getDocStudent(id);
      if (!ret) {
        res.status(500).send("Não foi possível buscar os documentos.");
      } else {
        res.status(200).send(ret);
      }
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar buscar os alunos.");
    }
  },
};

export default alunosController;
