import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { info } from 'firebase-functions/logger'
import { auth, firestore } from './services/firebase'
import { loginDataSchema } from './schemas/login'
import { getTitleDataSchema } from './schemas/form'
import { passwordGenerator } from './utils/password-generator'
import { createAdminDataSchema, updateAdminDataSchema } from './schemas/admin'
import { z, ZodError } from 'zod'

export const loginWithCPF = onCall(async (request) => {
  try {
      const { cpf, password } = loginDataSchema.parse(request.data)

      const studentsDocumentSnapshot = await firestore
          .collection("users")
          .doc(cpf)
          .collection("credentials")
          .where("password", "==", password)
          .limit(1)
          .get()

      if (studentsDocumentSnapshot.empty) throw new Error("Invalid CPF or inexistent user")

      return auth.createCustomToken(cpf)
  } catch (error) {
      info(error, { structuredData: true });

      return new HttpsError("unauthenticated", "Invalid CPF or inexistent user")
  }
});

export const getTitleByUrl = onCall(async (request) => {
  const { url } = getTitleDataSchema.parse(request.data)

  const form = await fetch(url)
  const text = await form.text()
  const title = text.match(/<title>(.*?)<\/title>/)?.[1] ?? null

  return title
})
