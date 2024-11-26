import { db } from "../config/database";

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

function validateTeacher(
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

async function createTeacher(
  id_professor: string,
  nome: string,
  datanasc: string,
  email: string,
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
  cidadedenascimento: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      !id_professor ||
      !nome ||
      !cpf ||
      !rg ||
      !datanasc ||
      !email ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !datadeexpedicaorg ||
      !estadodeexpedicaorg ||
      !estadonascimento ||
      !cidadedenascimento
    ) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    }

    if (!validateTeacher) return (resposta = "O dado enviado é inválido.");
    else {
      await db.query(
        `INSERT INTO professor(
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
              cidadedenascimento) 
              VALUES($1, $2, $3 , $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          parseInt(id_professor),
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
        ]
      );
    }

    resposta = await getTeacher(id_professor);
    return resposta;
  } catch (error) {
    console.error(error);
    return `Não foi possível cadastrar o professor`;
  }
}

async function updateTeacher(
  id_professor: string,
  nome: string,
  datanasc: string,
  email: string,
  estado: string,
  municipio: string,
  rua: string,
  bairro: string,
  numero: string,
  cpf: string,
  rg: string,
  datadeexpedicaorg: Date,
  estadodeexpedicaorg: string,
  estadonascimento: string,
  cidadedenascimento: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      !id_professor ||
      !nome ||
      !cpf ||
      !rg ||
      !datanasc ||
      !email ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !datadeexpedicaorg ||
      !estadodeexpedicaorg ||
      !estadonascimento ||
      !cidadedenascimento
    ) {
      resposta = "Todos os dados são obrigatórios.";
      return resposta;
    } else {
      if (!validateTeacher) return (resposta = "O dado enviado é inválido.");
      else {
        await db.query(
          `UPDATE professor
          SET
              nome = $2, 
              datanasc = $3, 
              email = $4, 
              estado = $5, 
              municipio = $6, 
              rua = $7, 
              bairro = $8, 
              numero = $9, 
              cpf = $11, 
              rg = $10, 
              datadeexpedicaorg = $12, 
              estadodeexpedicaorg = $13, 
              estadonascimento = $14, 
              cidadedenascimento = $15
            WHERE id_professor = $1`,
          [
            parseInt(id_professor),
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
          ]
        );
      }
      resposta = await getTeacher(id_professor);
      return resposta;
    }
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    return "Não foi possível atualizar o professor";
  }
}

async function getAllTeachers(): Promise<any> {
  try {
    const resposta = await db.query("SELECT * FROM professor");

    if (resposta.rows.length === 0) {
      return "Nenhum professor encontrado.";
    }
    return resposta.rows;
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
    return "Erro ao buscar professores.";
  }
}

async function getTeacher(idprofessor: string): Promise<string> {
  try {
    if (!idprofessor) {
      return "ID é obrigatório.";
    }

    const resposta = await db.query(
      "SELECT * FROM professor WHERE id_professor = $1",
      [parseInt(idprofessor)]
    );

    if (resposta.rows.length === 0) {
      return `Professor com ID ${idprofessor} não encontrado.`;
    }

    const professor = resposta.rows[0];
    return professor;
  } catch (erro) {
    console.error("Erro ao buscar professor:", erro);
    return "Erro ao buscar professor.";
  }
}

async function deleteTeacher(idprofessor: string) {
  try {
    let resposta = "";
    if (!idprofessor) {
      resposta = "Professor não enontrado";
      return resposta;
    } else {
      await db.query("DELETE FROM professor WHERE id_professor = $1", [
        parseInt(idprofessor),
      ]);
      return "Professor removido com seucesso.";
    }
  } catch (error) {
    console.log(`Erro ao cadastrar o professor`, error);
    return `Erro ao cadastrar professor`;
  }
}

export const teacherService = {
  createTeacher: (
    id_professor: string,
    nome: string,
    datanasc: string,
    email: string,
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
    cidadedenascimento: string
  ) =>
    createTeacher(
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
    ),
  updateTeacher: (
    id_professor: string,
    nome: string,
    datanasc: string,
    email: string,
    estado: string,
    municipio: string,
    rua: string,
    bairro: string,
    numero: string,
    cpf: string,
    rg: string,
    datadeexpedicaorg: Date,
    estadodeexpedicaorg: string,
    estadonascimento: string,
    cidadedenascimento: string
  ) =>
    updateTeacher(
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
    ),
  deleteTeacher: (idprofessor: string) => deleteTeacher(idprofessor),
  getTeacher: (idprofessor: string) => getTeacher(idprofessor),
  getAllTeachers: () => getAllTeachers(),
};
