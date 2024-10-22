import { createFileRoute } from '@tanstack/react-router';
import { Formik, Form } from 'formik';
import { toFormikValidate } from 'zod-formik-adapter';
import { useListSubjectsQuery } from '@/queries/use-list-subjects-query';
import { subjectsSchema } from '@/models/subjects-schema';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '@/services/firebase';
import { InputForm } from '@/components/custom/text-input';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/list-subjects')({
  component: ListSubjects,
});

function ListSubjects() {
  const { data } = useListSubjectsQuery('aQjvxCKlEuHc9YQEedCQ');
  const validate = toFormikValidate(subjectsSchema);

  return (
    <>
   <h1 className="text-left text-2xl font-bold mb-2 ml-4 mt-4">Adicionar Disciplina</h1>
   <hr className="mb-4" />
      <Formik
        initialValues={{ name: '', description: '', startDate: '', endDate: '', workload: '', teacher: ''}}
        validate={validate}
        onSubmit={async (values, { resetForm }) => {
          await addDoc(collection(firestore, 'schoolMatrices', 'aQjvxCKlEuHc9YQEedCQ', 'subjects'), values);
          console.log('Valores do formulário:', values);
          resetForm();
        }}
      >
        
          <Form className="flex items-center justify-center flex-col gap-4 p-6">
            <InputForm
              title="Nome da Matéria"
              label="name"
              name="name"
              placeholder="Digite o nome da matéria"
              id="name"
            />
             <InputForm
              title="Data de Início"
              label="startDate"
              name="startDate"
              placeholder="Digite a data de início"
              id="startDate"
            />
             <InputForm
              title="Data de Término"
              label="endDate"
              name="endDate"
              placeholder="Digite a data de término"
              id="endDate"
            />
            <InputForm
              title="Descrição"
              label="description"
              name="description"
              placeholder="Digite a descrição da matéria"
              id="description"
            />

            <InputForm
              title="Carga Horária total da Matéria"
              label="workload"
              name="workload"
              placeholder="Digite a carga horária"
              id="workload"
            />
            <InputForm
            title="Nome professor"
            label="teacher"
            name="teacher"
            placeholder='digite professor'
            id="teacher"
            />
            <div className="flex gap-4">
              <Button
                type="button"
                variant="ghostBlack"
                size="medium"
              >
                Cancelar
              </Button>
              <Button type="submit" variant="blueButton" size="medium" iconPosition="right">
                Cadastrar Aulas
              </Button>
            </div>
          </Form>
        
      </Formik>
    </>
  );
}

export default ListSubjects;
