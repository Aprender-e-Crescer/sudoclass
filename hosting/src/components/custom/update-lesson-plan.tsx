import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/components/custom/text-input';
import { useUpdateLessonPlanMutation } from '@/mutations/use-update-lesson-plan-mutation';
import { updateLessonPlanSchema } from '@/models/update-lesson-plan-schema';

interface LessonPlanUpdate {
  id: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  trainingContent: string;
  teachingMethodology: string;
  teachingResources: string;
}

const UpdateLessonPlan: React.FC = () => {
  const { mutate } = useUpdateLessonPlanMutation({
    onSuccess: () => {
      console.log('Plano de aula atualizado com sucesso!');
    },
    onError: (err) => {
      console.error('Erro ao atualizar o plano de aula:', err);
    },
  });

  const initialValues: Omit<LessonPlanUpdate, 'id'> = {
    date: '2000-10-20',
    timeStart: '10:10',
    timeEnd: '20:30',
    trainingContent: 'ttt',
    teachingMethodology: 'teste',
    teachingResources: 'test',
  };

  // Função para validação usando Zod
  const validateSchema = (values: Omit<LessonPlanUpdate, 'id'>) => {
    try {
      updateLessonPlanSchema.parse({ id: 'mY1EIVyB4sZ6WWALNtne', ...values });
      return {}; // Validação bem-sucedida
    } catch (error) {
      return error.errors.reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
    }
  };

  return (
    <div className="flex flex-row h-screen relative mx-5">
      <div className="flex-grow flex flex-col items-center justify-start mt-5">
        <Formik
          initialValues={initialValues}
          validate={validateSchema}  // Usando o método de validação Zod
          onSubmit={(values) => {
            mutate({ id: 'mY1EIVyB4sZ6WWALNtne', ...values } as LessonPlanUpdate);
          }}
        >
          <Form className="flex flex-col space-y-6 w-full">
            <div className="w-full border border-[#C6C6C6] rounded-lg p-5">
              <div>
                <h1>Data</h1>
                <Field name="date">
                  {({ field }) => (
                    <InputForm
                      type="date"
                      placeholder="Selecione a data"
                      id="date"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Hora de Início</h1>
                <Field name="timeStart">
                  {({ field }) => (
                    <InputForm
                      type="time"
                      placeholder="Selecione a hora de início"
                      id="timeStart"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Hora de Fim</h1>
                <Field name="timeEnd">
                  {({ field }) => (
                    <InputForm
                      type="time"
                      placeholder="Selecione a hora de fim"
                      id="timeEnd"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Conteúdo Formativo</h1>
                <Field name="trainingContent">
                  {({ field }) => (
                    <InputForm
                      type="text"
                      placeholder="Descreva o conteúdo formativo"
                      id="trainingContent"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Metodologia de Ensino</h1>
                <Field name="teachingMethodology">
                  {({ field }) => (
                    <InputForm
                      type="text"
                      placeholder="Descreva a metodologia de ensino"
                      id="teachingMethodology"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Recursos Didáticos</h1>
                <Field name="teachingResources">
                  {({ field }) => (
                    <InputForm
                      type="text"
                      placeholder="Descreva os recursos didáticos"
                      id="teachingResources"
                      {...field}
                    />
                  )}
                </Field>
              </div>
            </div>

            <div className="flex justify-center mt-5 gap-2">
              <Button type="button" variant="lightTextBlack" size="large">
                Cancelar
              </Button>
              <Button type="submit" size="large">
                Atualizar
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UpdateLessonPlan;
