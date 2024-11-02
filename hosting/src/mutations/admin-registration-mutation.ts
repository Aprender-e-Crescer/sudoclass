import { addDoc, collection, Firestore } from "firebase/firestore"
import { z } from "zod"

interface AdminData {
    nome: string
    cpf: string
}

const adminSchema = z.object({
    nome: z.string().min(3, 'Nome precisa ter no mínimo 3 caracteres'),
    cpf: z.string().length(11, 'CPF precisa ter 11 caracteres')
})

export async function adminRegistration(db: Firestore, adminData: AdminData) {
    try {
        adminSchema.parse(adminData)
        const newAdminRef = await addDoc(collection(db, 'admins'), adminData)
        console.log("Admin cadastrado com sucesso", newAdminRef.id)
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log("Erro de validação:", error.errors)
        } else {
            console.log("Erro ao cadastrar admin:", error)
        }
    }
}
