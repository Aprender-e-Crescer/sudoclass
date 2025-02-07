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

export const createAdmin = onCall(async (request) => {
  try {
    const { cpf, fullName } = createAdminDataSchema.parse(request.data)

    const userRef = firestore.collection("users").doc(cpf)
  
    const userAlreadyExist = await userRef.get().then((doc) => doc.exists)
  
    if (userAlreadyExist) throw new HttpsError("already-exists", "User already exists")
  
    const password = passwordGenerator()
  
    const profileRef = firestore.collection("profiles").doc()
    const roleRef = firestore.collection("admins").doc()
  
    const batch = firestore.batch()
  
    batch.set(userRef, {
      fullName,
      profileRef,
      roleRef,
      dateOfBirth: null,
      email: null,
      rgNumber: null,
      rgDispatchDate: null,
      rgDispatchStatus: null,
      birthStatus: null,
      birthCity: null,
      address: {
        state: null,
        municipality: null,
        road: null,
        neighborhood: null,
        number: null,
        city: null,
        streetNumber: null,
      }
    })
  
    batch.set(userRef.collection("credentials").doc(), { password })
    batch.set(profileRef, { displayName: fullName, photoUrl: null })
  
    return batch.commit()
  } catch (error) {
    if (error instanceof ZodError) throw new HttpsError("invalid-argument", "Invalid data")
    
    throw new HttpsError("internal", "Error on creating user")
  }
})

export const updateAdmin = onCall(async (request) => {
  try {
    const { id, cpf, fullName } = updateAdminDataSchema.parse(request.data)

    const userRef = firestore.collection("users").doc(id)
  
    const userSnapshot = await userRef.get()
    const userDontExists = !userSnapshot.exists
    const userData = userSnapshot.data()
  
    if (userDontExists) throw new HttpsError("data-loss", "User not found")

    const newUserRef = firestore.collection("users").doc(cpf)
  
    if (userRef.id === newUserRef.id) return userRef.update({ fullName })

    const batch = firestore.batch()

    const credentialSnapshot = await userRef.collection("crendentials").limit(1).get()

    const credential = z.object({
      password: z.string()
    }).parse(credentialSnapshot.docs[0].data())

    batch.delete(userRef)
    batch.set(newUserRef, { ...userData, fullName })
    batch.set(newUserRef.collection("credentials").doc(), credential)

    return batch.commit()
  } catch (error) {
    if (error instanceof ZodError) throw new HttpsError("invalid-argument", "Invalid data")
    
    throw new HttpsError("internal", "Error on updating user")
  }
})
