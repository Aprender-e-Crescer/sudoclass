import { createFileRoute } from '@tanstack/react-router';
import { Formik, Form } from 'formik';
import { useListSubjectsQuery } from '@/queries/use-list-subjects-query';
import { InputForm } from '@/components/custom/text-input'; 

export const Route = createFileRoute('/list-subjects')({
  component: ListSubjects,
});

function ListSubjects() {
  const { data } = useListSubjectsQuery('aQjvxCKlEuHc9YQEedCQ');

  return (
    <>
      <Formik
        initialValues={{ name: '', description: '' }}
        onSubmit={(values, { resetForm }) => {
          console.log('Valores do formulário:', values);
          resetForm();
        }}
      >
        <Form className="flex items-center justify-center flex-col gap-4 p-6">
          <InputForm
            title="Nome da matéria"
            label="name"
            placeholder="Digite o nome da matéria"
            id="name"
            name="name"
          />
          <InputForm
            title="Descrição da matéria"
            label="description"
            placeholder="Digite a descrição da matéria"
            id="description"
            name="description"
          />
          <button type="submit" className="mt-4 bg-green-400 text-white rounded-md p-2">
            Enviar
          </button>
        </Form>
      </Formik>

      <div className="mt-6 items-center justify-center flex flex-col gap-y-3">
        <p className="font-bold text-3xl">Matérias já existentes:</p>
        <div className="flex flex-col items-start">
          {data?.map((subject, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-lg font-semibold">{subject.name}</h3>
              <p className="text-gray-600">{subject.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListSubjects;
