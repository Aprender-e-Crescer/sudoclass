import { HttpsError, onCall } from "firebase-functions/v2/https";
import { onRequest } from "firebase-functions/v1/https";
import { info } from "firebase-functions/logger";
import { auth, firestore } from "./services/firebase";
import { loginDataSchema } from "./schemas/login";
import app from "./app";

export const loginWithCPF = onCall(async (request) => {
    try {
        const { cpf, password } = loginDataSchema.parse(request.data)

        const studentsDocumentSnapshot = await firestore.collection("users")
            .where("cpf", "==", cpf)
            .where("password", "==", password)
            .limit(1)
            .get()

        if (studentsDocumentSnapshot.empty) throw new Error("User not found with this CPF and password.")

        return auth.createCustomToken(cpf)
    } catch (error) {
        info(error, { structuredData: true });

        return new HttpsError("unauthenticated", "CPF inválido ou inexistente.")
    }
});

export const api = onRequest(app)