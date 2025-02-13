import { role } from "@/types/user";
import { DocumentReference } from "firebase/firestore";

export const getRoleFromRef = (roleRef: DocumentReference) => roleRef?.path.split('/')[0].slice(0, -1) as role

export const getRoleTranslation = (role: role) => {
    switch (role) {
        case 'student':
            return 'Aluno'
        case 'teacher':
            return 'Professor'
        case 'responsible':
            return 'Responsável'
        case 'admin':
            return 'Administrador'
        default:
            return 'Não identificado'
    }
}
