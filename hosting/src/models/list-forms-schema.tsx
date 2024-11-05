import { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore';

export const listFormSchema: FirestoreDataConverter<any> = {
  toFirestore: (form) => ({
    name: form.name,
    createdBy: form.createdBy,
    createdDate: form.createdDate,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data();

    return {
      name: typeof data.name === 'string' ? data.name : 'Nome não definido',
      createdBy: typeof data.createdBy === 'string' ? data.createdBy : 'Autor não definido',
      createdDate: data.createdDate ? data.createdDate.toDate().toLocaleDateString('pt-BR') : 'Data não definida',
    };
  },
};
