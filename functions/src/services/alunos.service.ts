import { db } from "../config/database";
import { responsibleService } from "./responsible.service";

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateRG(RG: string) {
  const valid = new RegExp(/^(\d{1,2})\.(\d{3})\.(\d{3})-(\d|X|x)$/);
  return valid.test(RG);
}

function validarDataNascimento(data: string): boolean {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  return regex.test(data);
}

function validateStudent(
  nome: string,
  cpf: string,
  email: string,
  RG: string,
  datadenascimento: string
) {
  if (nome.length < 4) return false;
  if (cpf.length < 11) return false;
  if (!validateEmail(email)) return false;
  if (!validateRG(RG)) return false;
  if (!validarDataNascimento(datadenascimento)) return false;

  return true;
}

async function createStudent(
  id_aluno: string,
  nome: string,
  email: string,
  data_nasc: string,
  estado: string,
  municipio: string,
  rua: string,
  bairro: string,
  numero: string,
  cpf: string,
  rg: string,
  datadeexpedicaorg: Date,
  estadodeexpedicaorg: string,
  estadonascimento: Date,
  cidadenascimento: string,

  id_responsavel: string,
  tipo_responsavel: string,
  nome_responsavel: string,
  email_responsavel: string,
  telefone_responsavel: string,
  estado_responsavel: string,
  municipio_responsavel: string,
  rua_responsavel: string,
  bairro_responsavel: string,
  numero_responsavel: string,
  dataNascimento_responsavel: string,
  cpf_responsavel: string,
  rg_responsavel: string,
  documentos_responsavel: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      !id_aluno ||
      !nome ||
      !email ||
      !data_nasc ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !rg ||
      !datadeexpedicaorg ||
      !estadodeexpedicaorg ||
      !estadonascimento ||
      !cidadenascimento ||
      !cpf
    ) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    } else {
      if (!validateStudent) return (resposta = "O dado enviado é inválido.");
      else {
        await db.query(
          `INSERT INTO alunos (
                      id_aluno,
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
                      cpf)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
          [
            parseInt(id_aluno),
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
            cpf,
          ]
        );
      }
    }
    responsibleService.createResponsable(
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

    resposta = await getStudent(id_aluno);
    return resposta;
  } catch (error) {
    console.error(error);
    return `Não foi possível cadastrar o Aluno`;
  }
}

async function updateStudent(
  id_aluno: string,
  nome: string,
  email: string,
  data_nasc: string,
  estado: string,
  municipio: string,
  rua: string,
  bairro: string,
  numero: number,
  rg: string,
  datadeexpedicaorg: Date,
  estadodeexpedicaorg: string,
  estadonascimento: string,
  cidadenascimento: string,
  cpf: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      !id_aluno ||
      !nome ||
      !email ||
      !data_nasc ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !rg ||
      !datadeexpedicaorg ||
      !estadodeexpedicaorg ||
      !estadonascimento ||
      !cidadenascimento ||
      !cpf
    ) {
      resposta = "Todos os dados são obrigatórios.";
      return resposta;
    } else {
      if (!validateStudent) return (resposta = "O dado enviado é inválido.");
      else {
        await db.query(
          `UPDATE alunos
          SET
            nome = $2,
            email = $3,
            estado = $4,
            municipio = $5,
            rua = $6,
            bairro = $7,
            numero = $8,
            cpf = $9,
            rg = $10,
            datadeexpedicaorg = $11,
            estadodeexpedicaorg = $12,
            estadonascimento = $13,
            cidadenascimento = $14,
            data_nasc = $15
          WHERE id_aluno = $1`,
          [
            parseInt(id_aluno),
            nome,
            email,
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
            data_nasc,
          ]
        );
      }
      resposta = await getStudent(id_aluno);
      return resposta;
    }
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    return "Não foi possível atualizar o aluno";
  }
}

async function getAllStudent(): Promise<string | any[]> {
  try {
    const resposta = await db.query("SELECT * FROM alunos");

    if (resposta.rows.length === 0) {
      return "Nenhum aluno encontrado.";
    }
    return resposta.rows;
  } catch (error) {
    console.error("Erro ao buscar o aluno:", error);
    return "Erro ao buscar o aluno";
  }
}

async function getStudent(id_aluno: string): Promise<string> {
  try {
    if (!id_aluno) {
      return "ID é obrigatório.";
    }

    const resposta = await db.query(
      "SELECT * FROM alunos WHERE id_aluno = $1",
      [parseInt(id_aluno)]
    );

    if (resposta.rows.length === 0) {
      return `aluno com ID ${id_aluno} não encontrado.`;
    }

    const aluno = resposta.rows[0];
    return aluno;
  } catch (erro) {
    console.error("Erro ao buscar aluno:", erro);
    return "Erro ao buscar aluno.";
  }
}

async function getDocStudent(id_aluno: string): Promise<string> {
  try {
    if (!id_aluno) {
      return "ID é obrigatório.";
    }

    const resposta = await db.query(
      `SELECT nome FROM docalunos WHERE id_aluno = ${id_aluno}`,
    );

    if (resposta.rows.length === 0) {
      return `Documento do aluno não encontrado.`;
    }

    const document = resposta.rows[0];
    return document;
  } catch (erro) {
    console.error("Erro ao buscar o documento:", erro);
    return "Erro ao buscar o documento:";
  }
}

async function deleteStudent(id_aluno: string) {
  try {
    let resposta = "";
    if (!id_aluno) {
      resposta = "Aluno não enontrado";
      return resposta;
    } else {
      await db.query("DELETE FROM alunos WHERE id_aluno = $1", [
        parseInt(id_aluno),
      ]);
      return "Aluno removido com seucesso.";
    }
  } catch (error) {
    console.log(`Erro ao excluir aluno`, error);
    return `Erro ao excluir aluno`;
  }
}

export const alunoService = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudent,
  getDocStudent,
};
