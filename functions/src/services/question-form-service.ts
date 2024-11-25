async function createQuestion(
  description: string,
  displayOrder: number,
  typeAnswer: 'Descritiva' | 'Assinalar',
  formId: string
): Promise<string> {
  try {
    let resposta = ''
    if (!description || !displayOrder || typeAnswer) {
      resposta =
        'A descrição, id do formulário, ordem de exibição e o tipo da resposta são obrigatórios'
      return resposta
    }
    resposta = `Pergunta criada no formulario de id ${formId} com descrição  ${description},
     sera exibida na ordem ${displayOrder},
     e o seu tipo de resposta é ${typeAnswer}`
    return resposta
  } catch (error) {
    console.error('Erro ao criar pergunta de formulário:', error)
    return 'Erro ao cadastrar pergunta'
  }
}

async function uptadeQuestion(
  id: string,
  description: string,
  displayOrder: number,
  typeAnswer: 'Descritiva' | 'Assinalar',
  formId: string
): Promise<string> {
  try {
    let resposta = ''
    if (!id || !description || !displayOrder || !typeAnswer) {
      resposta = 'Os atributos são obrigatórios para a atualização da pergunta'
      return resposta
    }
    resposta = `Pergunta atualizada no formulario com id ${formId} com o id de pergunta${id},
     com a descrição ${description},
     com a ordem de exibição na ${displayOrder} ordem,
      e com o tipo da resposta como ${typeAnswer}`
    return resposta
  } catch (error) {
    console.error('Não foi possivel atualizar a pergunta', error)
    return `Erro ao atualizar pergunta`
  }
}

async function deleteQuestion(id: string, formId: string): Promise<string> {
  try {
    if (!id) {
      return 'O id da pergunta é obrigatório'
    }
    const response = `Pergunta com o id ${id} foi deletada no formulario com id ${formId} com sucesso`
    return response
  } catch (error) {
    console.error('Erro ao tentar deletar pergunta', error)
    return 'Erro ao deletar curso'
  }
}

export const questionService = {
  createQuestion: (
    description: string,
    displayOrder: number,
    typeAnswer: 'Descritiva' | 'Assinalar',
    formId: string
  ) => createQuestion(description, displayOrder, typeAnswer, formId),
  uptadeQuestion: (
    id: string,
    description: string,
    displayOrder: number,
    typeAnswer: 'Descritiva' | 'Assinalar',
    formId: string
  ) => uptadeQuestion(id, description, displayOrder, typeAnswer, formId),
  deleteQuestion: (id: string, formId: string) => deleteQuestion(id, formId),
}
