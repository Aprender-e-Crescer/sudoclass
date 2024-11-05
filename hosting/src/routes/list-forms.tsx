import { SetStateAction, useState } from 'react';
import { GenericTable } from '@/components/custom/generic-table';
import { InputWithoutLabel } from '@/components/custom/without-label-input';
import { createFileRoute } from '@tanstack/react-router';
import { Form, Formik, Field } from 'formik';
import { Eye, Search } from 'lucide-react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { listFormsQuery } from '@/queries/list-forms-query';
import { getInputSchema } from '@/models/get-input-schema';

export const Route = createFileRoute('/list-forms')({
  component: ListForms,
});

const initialValues = {
  value: '',
};

const columns = [
  { header: 'Formulario', accessor: 'name' },
  { header: 'Criado Em', accessor: 'createdDate' },
  { header: 'Criado Por', accessor: 'createdBy' },
  {
    header: 'Ações',
    Cell: () => (
      <span className="cursor-pointer">
        <Eye />
      </span>
    ),
  },
];

export function ListForms() {
  const { data, isLoading, error } = listFormsQuery();

  const [searchValue, setSearchValue] = useState('');

  const filteredData = data?.filter((form: any) =>
    form.name?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados</p>;

  return (
    <div className="flex flex-col gap-4 mx-20 my-10">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(getInputSchema)}
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
