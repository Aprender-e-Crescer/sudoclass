import React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/components/custom/text-input';
import { useUpdateLessonPlanMutation } from '@/mutations/use-update-lesson-plan-mutation';
import { updateLessonPlanSchema } from '@/models/update-lesson-plan-schema';

interface FormValues {
  id: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  conteudoFormativo: string;
  metodologiaDeEnsino: string;
  recursosDidaticos: string;
}

const UpdateLessonPlan: React.FC = () => {
  const { mutate } = useUpdateLessonPlanMutation();

  return (
    <div className="flex flex-row h-screen relative mx-5">
      <div className="flex-grow flex flex-col items-center justify-start mt-5">
        <Formik<FormValues>
          initialValues={{
            id: 'mY1EIVyB4sZ6WWALNtne',
            data: '2023-10-18',
            horaInicio: '18:30',
            horaFim: '20:30',
            conteudoFormativo: '',
            metodologiaDeEnsino: '',
            recursosDidaticos: '',
          }}
          validationSchema={updateLessonPlanSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col space-y-6 w-full">
              <div className="w-full border border-[#C6C6C6] rounded-lg p-5">
                <div>
                  <h1>Data</h1>
                  <Field name="data">
                    {({ field }: FieldProps) => (
                      <InputForm
                        type="date"
                        placeholder="Selecione a data"
                        id="data"
                        {...field}
                      />
                    )}
                  </Field>
                  {errors.data && touched.data && <div className="text-red-500">{errors.data}</div>}
                </div>

                <div>
                  <h1>Início</h1>
                  <Field name="horaInicio">
                    {({ field }: FieldProps) => (
                      <InputForm
                        type="time"
                        placeholder="Selecione a hora de início"
                        id="horaInicio"
                        {...field}
                      />
                    )}
                  </Field>
                  {errors.horaInicio && touched.horaInicio && (
                    <div className="text-red-500">{errors.horaInicio}</div>
                  )}
                </div>

                <div>
                  <h1>Fim</h1>
                  <Field name="horaFim">
                    {({ field }: FieldProps) => (
                      <InputForm
                        type="time"
                        placeholder="Selecione a hora de fim"
                        id="horaFim"
                        {...field}
                      />
                    )}
                  </Field>
                  {errors.horaFim && touched.horaFim && (
                    <div className="text-red-500">{errors.horaFim}</div>
                  )}
                </div>

                <div>
                  <h1>Conteúdo formativo</h1>
                  <Field name="conteudoFormativo">
                    {({ field }: FieldProps) => (
                      <InputForm
                        type="text"
                        placeholder="Descreva o conteúdo formativo"
                        id="conteudoFormativo"
                        {...field}
                      />
                    )}
                  </Field>
                  {errors.conteudoFormativo && touched.conteudoFormativo && (
                    <div className="text-red-500">{errors.conteudoFormativo}</div>
                  )}
                </div>

                <div>
                  <h1>Metodologia de ensino</h1>
                  <Field name="metodologiaDeEnsino">
                    {({ field }: FieldProps) => (
                      <InputForm
                        type="text"
                        placeholder="Descreva a metodologia de ensino"
                        id="metodologiaDeEnsino"
                        {...field}
                      />
                    )}
                  </Field>
                  {errors.metodologiaDeEnsino && touched.metodologiaDeEnsino && (
                    <div className="text-red-500">{errors.metodologiaDeEnsino}</div>
                  )}
                </div>

                <div>
                  <h1>Recursos didáticos</h1>
                  <Field name="recursosDidaticos">
                    {({ field }: FieldProps) => (
                      <InputForm
                        type="text"
                        placeholder="Descreva os recursos didáticos"
                        id="recursosDidaticos"
                        {...field}
                      />
                    )}
                  </Field>
                  {errors.recursosDidaticos && touched.recursosDidaticos && (
                    <div className="text-red-500">{errors.recursosDidaticos}</div>
                  )}
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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateLessonPlan;
