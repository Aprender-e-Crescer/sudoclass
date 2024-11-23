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

async function updateTeacher(
  idteacher: string,
  nome: string,
  cpf: string,
  email: string,
  telefone: string,
  estado: string,
  rua: string,
  bairro: string,
  municipio: string,
  numero: number,
  datadenascimento: Date,
  RG: string,
  datadeespedicao: Date,
  naturalidade: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      !idteacher ||
      !nome ||
      !cpf ||
      !email ||
      !telefone ||
      !estado ||
      !rua ||
      !bairro ||
      !municipio ||
      !numero ||
      !datadenascimento ||
      !RG ||
      !datadeespedicao ||
      !naturalidade
    ) {
      resposta = "ID, Nome e CPF são obrigatórios.";
      return resposta;
    }
    resposta = `O professor que atualizamos é ${nome} que possui o CPF ${cpf}`;
    return resposta;
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    return "Erro ao atualizar professor";
  }
}

async function createTeacher(
  idteacher: string,
  nome: string,
  cpf: string,
  email: string,
  telefone: string,
  estado: string,
  rua: string,
  bairro: string,
  municipio: string,
  numero: number,
  datadenascimento: Date,
  RG: string,
  datadeespedicao: Date,
  naturalidade: string
): Promise<string> {
  try {
    let resposta = "";

    if (
      !idteacher ||
      !nome ||
      !cpf ||
      !email ||
      !telefone ||
      !estado ||
      !rua ||
      !bairro ||
      !municipio ||
      !numero ||
      !datadenascimento ||
      !RG ||
      !datadeespedicao ||
      !naturalidade
    ) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    }

    if (!validateTeacher) return (resposta = "O dado enviado é inválido.");

    const cadastroNoBanco = `INSERT INTO teacher values(
        idteacher
        nome
        cpf
        email
        telefone
        estado
        rua
        bairro
        municipio
        numero
        datadenascimento
        RG
        datadeespedicao
        naturalidade)`;

    resposta = "O cadastro de professor foi realizado";
    return resposta;
  } catch (error) {
    console.log(`Erro ao cadsatrar professor`, error);
    return `Erro ao cadastrar o professor`;
  }
}

async function deleteTeacher(
  idteacher: string,
  nome: string,
  cpf: string,
  email: string,
  telefone: string,
  estado: string,
  rua: string,
  bairro: string,
  municipio: string,
  numero: number,
  datadenascimento: Date,
  RG: string,
  datadeespedicao: Date,
  naturalidade: string
) {
  try {
    let resposta = "";
    if (!idteacher) {
      resposta = "Usuário não enontrado";
      return resposta;
    } else {
      resposta = `Excluindo o usuário ${nome} id:${idteacher}`;
    }
  } catch (error) {
    console.log(`Erro ao cadastrar o professor`, error);
    return `Erro ao cadastrar professor`;
  }
}

export const teacherService = {
  createTeacher: (
    idteacher: string,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    estado: string,
    rua: string,
    bairro: string,
    municipio: string,
    numero: number,
    datadenascimento: Date,
    RG: string,
    datadeespedicao: Date,
    naturalidade: string
  ) =>
    createTeacher(
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
    ),
  updateTeacher: (
    idteacher: string,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    estado: string,
    rua: string,
    bairro: string,
    municipio: string,
    numero: number,
    datadenascimento: Date,
    RG: string,
    datadeespedicao: Date,
    naturalidade: string
  ) =>
    updateTeacher(
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
    ),
  deleteTeacher: (
    idteacher: string,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    estado: string,
    rua: string,
    bairro: string,
    municipio: string,
    numero: number,
    datadenascimento: Date,
    RG: string,
    datadeespedicao: Date,
    naturalidade: string
  ) =>
    deleteTeacher(
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
    ),
};
