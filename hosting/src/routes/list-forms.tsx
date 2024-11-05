import { SetStateAction, useState } from 'react';
import { GenericTable } from '@/components/custom/generic-table';
import { InputWithoutLabel } from '@/components/custom/without-label-input';
import { createFileRoute } from '@tanstack/react-router';
import { Form, Formik, Field } from 'formik';
import { Eye, Search } from 'lucide-react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useQuery } from '@tanstack/react-query';
import * as z from 'zod';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

export const Route = createFileRoute('/list-forms')({
  component: ListForms,
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const inputSchema = z.object({
  value: z.string().min(1, 'Por favor, insira o valor corretamente'),
});

const initialValues = {
  value: '',
};

const columns = [
  { header: 'Formulario', accessor: 'name' },
  { header: 'Criado Em', accessor: 'creationDate' },
  { header: 'Criado Por', accessor: 'createdby' },
  { header: 'Aluno', accessor: 'student' },
  {
    header: 'Ações',
    Cell: () => (
      <span className="cursor-pointer">
        <Eye />
      </span>
    ),
  },
];

const fetchForms = async () => {
  const formsCollection = collection(db, 'documents');
  const formSnapshot = await getDocs(formsCollection);

  return formSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: typeof data.name === 'string' ? data.name : 'Nome não definido',
      createdby: data.createdby?.id || 'Autor não definido',
      creationDate: data.creationDate?.toDate().toLocaleDateString('pt-BR') || 'Data não definida',
      student: data.student?.id || 'Aluno não definido',
    };
  });
};


export function ListForms() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['forms'],
    queryFn: fetchForms,
  });

  const [searchValue, setSearchValue] = useState('');

  const filteredData = data?.filter((form) =>
    form.name?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados</p>;

  return (
    <div className="flex flex-col gap-4 mx-20 my-10">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(inputSchema)}
          onSubmit={(values) => {
            setSearchValue(values.value);
          }}
        >
          {({ handleChange }) => (
            <Form>
              <Field
                name="value"
                as={InputWithoutLabel}
                icon={<Search />}
                placeholder="Procurar Formularios"
                id="value"
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                  handleChange(e);
                  setSearchValue(e.target.value);
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h1 className="font-bold text-blue-950 text-4xl">Formulários Disponíveis</h1>
      </div>
      <GenericTable data={filteredData} columns={columns} />
    </div>
  );
}
