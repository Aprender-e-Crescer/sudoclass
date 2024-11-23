import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { onRequest } from 'firebase-functions/v1/https'
import { info } from 'firebase-functions/logger'
import { auth, firestore } from './services/firebase'
import { loginDataSchema } from './schemas/login'
import app from './app'
import { db } from './config/database'
import { getTitleDataSchema } from './schemas/form'

export const loginWithCPF = onCall(async (request) => {
  try {
    const { cpf, password } = loginDataSchema.parse(request.data)

    const users = await db.query(
      `
        SELECT 
            s.id_aluno AS id_entidade, 
            s.cpf AS cpf, 
            ag.senha,
            'aluno' AS tipo_entidade
        FROM 
            usuario ag
        INNER JOIN 
            alunos s 
        ON 
            ag.id_aluno = s.id_aluno
        WHERE 
            s.cpf = $1
            AND ag.senha = $2
        
        UNION ALL

        SELECT 
            s.id_professor AS id_entidade, 
            s.cpf AS cpf, 
            ag.senha,
            'professor' AS tipo_entidade
        FROM 
            usuario ag
        INNER JOIN 
            professor s 
        ON 
            ag.id_professor = s.id_professor
        WHERE 
            s.cpf = $1 
            AND ag.senha = $2
            
        UNION ALL

        SELECT 
            s.id_pedagogo AS id_entidade, 
            s.cpf AS cpf, 
            ag.senha,
            'pedagogo' AS tipo_entidade
        FROM 
            usuario ag
        INNER JOIN 
            pedagogo s 
        ON 
            ag.id_pedagogo = s.id_pedagogo

        WHERE 
            s.cpf = $1
            AND ag.senha = $2;    
        `,
      [cpf, password]
    )

    if (users.rows.length === 0)
      throw new Error('User not found with this CPF and password.')

    return auth.createCustomToken(cpf)
  } catch (error) {
    info(error, { structuredData: true })

    return new HttpsError('unauthenticated', 'CPF inválido ou inexistente.')
  }
})

export const api = onRequest(app)
export const getTitleByUrl = onCall(async (request) => {
  const { url } = getTitleDataSchema.parse(request.data)

  const form = await fetch(url)
  const text = await form.text()
  const title = text.match(/<title>(.*?)<\/title>/)?.[1] ?? null

  return title
})
