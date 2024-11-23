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

function validateResponsable(
  nome: string,
  cpf: string,
  email: string,
  RG: string,
  dataNascimento: string
) {
  if (nome.length < 4) return false;
  if (cpf.length < 11) return false;
  if (!validateEmail(email)) return false;
  if (!validateRG(RG)) return false;
  if (!validarDataNascimento(dataNascimento)) return false;
  
 
  return true;
}

async function createResponsable(
  id: string,
  tipo: string,
  nome: string,
  email: string,
  telefone: string,
  estado: string,
  municipio: string,
  rua: string,
  bairro: string,
  numero: string,
  dataNascimento: string, 
  cpf: string,
  rg: string,
  documentos: string
): Promise<string> {
   
  try {
    let resposta = "";
 
    if (
      !id ||
      !tipo ||
      !nome ||
      !email ||
      !telefone ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !dataNascimento ||
      !cpf ||
      !rg ||
      !documentos
    ) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    }
    if (!validateResponsable) return (resposta = "O dado enviado é inválido.");

    await db.query(`
      INSERT INTO responsavel (
        id_responsavel, 
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [id, tipo, nome, email, telefone, estado, municipio, rua, bairro, numero, dataNascimento, cpf, rg, documentos])
    resposta = "O cadastro do responsavel foi realizado com sucesso!";
    return resposta;
  } catch (error) {
    console.log(`Erro ao cadsatrar responsavel`, error);
    return `Erro ao cadastrar o responsavel`;
  }
}



async function updateResponsible(
  id: string,
  tipo: string,
  nome: string,
  email: string,
  telefone: string,
  estado: string,
  municipio: string,
  rua: string,
  bairro: string,
  numero: string,
  dataNascimento: string, 
  cpf: string,
  rg: string,
  documentos: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      ! id ||
      !tipo ||
      !nome ||
      !email ||
      !telefone ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !dataNascimento ||
      !cpf ||
      !rg ||
      !documentos
    ) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    }
    await db.query(`
      INSERT INTO responsavel (
        id_responsavel, 
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [id, tipo, nome, email, telefone, estado, municipio, rua, bairro, numero, dataNascimento, cpf, rg, documentos])
    resposta = "O cadastro do responsavel foi realizado com sucesso!";
    return resposta;

  } catch (error) {
    console.error("Erro ao atualizar responsável:", error);
    return "Erro ao atualizar responsável";
  }
}

async function deleteResponsible(id: string): Promise<string> {
  try {
    if (!id) {
      return "ID do responsavel é obrigatório";
    }
 
    const queryDeletar = 'DELETE FROM responsavel WHERE id_responsavel = $1';
    await db.query(queryDeletar, [id]);
 
    return `Responsavel com ID ${id} deletado com sucesso`;
  } catch (error) {
    console.error("Erro ao deletar Responsavel:", error);
    return "Erro ao deletar Responsavel";
  }
}

async function getResponsavel(id: string): Promise<string> {
  try {
    if (!id) {
      return "ID do curso é obrigatório"
    }
 
    const query = 'SELECT * FROM curso WHERE id_curso = $1'
    const resultado = await db.query(query, [id])
 
    if (resultado.rows.length === 0) {
      return "Curso não encontrado"
    }
 
    const curso = resultado.rows[0]
    return `Curso encontrado: ${curso.nome_curso}`
  } catch (error) {
    console.error("Erro ao buscar curso:", error)
    return "Erro ao buscar curso"
  }
}
 
async function verificarIdExistente(idCurso: string): Promise<boolean> {

  const queryVerificar = "SELECT * FROM curso WHERE id_responsavel = $1"
 
  const resultado = await db.query(queryVerificar, [parseInt(idCurso)])
 
  if (resultado.rows.length === 0){
    return false
  }
  else{
    return true
  }
 
}

export const responsibleService = {
createResponsable,
updateResponsible,
deleteResponsible,
getResponsavel,
verificarIdExistente,
};
