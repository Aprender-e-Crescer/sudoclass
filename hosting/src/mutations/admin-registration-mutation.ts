import { addDoc, collection, Firestore } from "firebase/firestore";
import { useMutation } from '@tanstack/react-query';
 
interface AdminData {
  nome: string;
  cpf: string;
}
 
export function useAdminRegistrationMutation(db: Firestore) {
  return useMutation({
    mutationKey: ['adminRegistration'],
    mutationFn: async (adminData: AdminData) => {
      try {
        const newAdminRef = await addDoc(collection(db, 'admins'), adminData);
        console.log("Admin cadastrado com sucesso", newAdminRef.id);
      } catch (error) {
        console.log("Erro ao cadastrar admin:", (error as Error).message);
      }
    },
  });
}