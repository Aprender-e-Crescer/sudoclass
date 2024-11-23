

 

 

 
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
 
 
    const query = `INSERT INTO teacher(
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
        naturalidade)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
 
    resposta = "O cadastro de professor foi realizado";
    return resposta;
  } catch (error) {
    console.log(`Erro ao cadsatrar professor`, error);
    return `Erro ao cadastrar o professor`;
  }
}
async function getTeacher(id: string): Promise<string> {
  try {
    if (!id) {
      return "ID é obrigatório.";
    }
 
    const resposta = await db.query(
      "SELECT * FROM professor WHERE id_professor = $1",
      [parseInt(id)]
    );
 
    if (resposta.rows.length === 0) {
      return `Professor com ID ${id} não encontrado.`;
    }
 
    const professor = resposta.rows[0];
    return `Professor com ID ${id} encontrado: ${professor.nome}`;
  } catch (erro) {
    console.error("Erro ao buscar professor:", erro);
    return "Erro ao buscar professor.";
  }
}
 
async function deleteTeacher(idteacher: string) {
  try {
    let resposta = "";
    if (!idteacher) {
      resposta = "Usuário não enontrado";
      return resposta;
    } else {
      resposta = `Excluindo o usuário id:${idteacher}`;
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
  deleteTeacher: (idteacher: string) => deleteTeacher(idteacher),
};