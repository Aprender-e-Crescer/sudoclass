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

export async function createResponsable(
  id_responsavel: string,
  tipo: string,
  nome: string,
  email: string,
  telefone: string,
  estado: string,
  municipio: string,
  rua: string,
  bairro: string,
  numero: string,
  data_nascimento: string, 
  cpf: string,
  rg: string,
  documentos: string
): Promise<string> {
   
  try {
    let resposta = "";
 
    if (
      !id_responsavel ||
      !tipo ||
      !nome ||
      !email ||
      !telefone ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !data_nascimento ||
      !cpf ||
      !rg ||
      !documentos
    ) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    }
    console.log("1");
    
    if (!validateResponsable) return (resposta = "O dado enviado é inválido.");

  else{
    console.log("2");
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
          numerocasa, 
          data_nascimento,
          cpf, 
          rg, 
          documentos
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [id_responsavel, tipo, nome, email, telefone, estado, municipio, rua, bairro, numero, data_nascimento, cpf, rg, documentos])
      const response = await getResponsavel(id_responsavel)
      return response;

    }
    
  } catch (error) {
    return `Erro ao cadastrar o responsavel`;
  }
}



async function updateResponsible(
  id_responsavel: string,
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
  
    await db.query(`
      UPDATE responsavel SET
        tipo = $1, 
        nome = $2,  
        email = $3,  
        telefone = $4, 
        estado = $5,  
        municipio = $6, 
        rua = $7, 
        bairro = $8, 
        numerocasa = $9, 
        data_nascimento = $10,
        cpf = $11, 
        rg = $12, 
        documentos = $13
      WHERE id_responsavel = $14`,
      [tipo, nome, email, telefone, estado, municipio, rua, bairro, numero, dataNascimento, cpf, rg, documentos, id_responsavel])
      const response = await getResponsavel(id_responsavel)
      
      return response;


  } catch (error) {
    console.error("Erro ao atualizar responsável:", error);
    return "Erro ao atualizar responsável";
  }
}

async function deleteResponsible(id_responsavel: string): Promise<string> {
  try {
    if (!id_responsavel) {
      return "ID do responsavel é obrigatório";
    }
 
    const queryDeletar = 'DELETE FROM responsavel WHERE id_responsavel = $1';
    await db.query(queryDeletar, [parseInt(id_responsavel)])
    return "Responsável deletado com sucesso"
  } catch (error) {
    console.error("Erro ao deletar Responsavel:", error);
    return "Erro ao deletar Responsavel";
  }
}

async function getResponsavel(id_responsavel: string): Promise<string> {
  try {
    if (!id_responsavel) {
      return "ID do responsavel é obrigatório"
    }
 
    const queryGet = 'SELECT * FROM responsavel WHERE id_responsavel = $1'
    const resultado = await db.query(queryGet, [parseInt(id_responsavel)])
 
    if (resultado.rows.length === 0) {
      return "Responsavel não encontrado"
    }
 
    const reponsavel = resultado.rows[0]
    return reponsavel
    
  } catch (error) {
    console.error("Erro ao buscar reponsavel:", error)
    return "Erro ao buscar reponsavel"
  }
}
 
async function verificarIdExistente(id_responsavel: string): Promise<boolean> {

  const queryVerificar = "SELECT * FROM responsavel WHERE id_responsavel = $1"
 
  const resultado = await db.query(queryVerificar, [parseInt(id_responsavel)])
 
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
