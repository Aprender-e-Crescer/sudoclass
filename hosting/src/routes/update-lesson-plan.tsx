import { createFileRoute } from '@tanstack/react-router';
import { Formik, Form, Field, FieldProps } from 'formik';
import { z } from 'zod';
import { InputForm } from '@/components/custom/text-input';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

const validationSchema = z.object({
  data: z.string().min(8, 'A data é obrigatória.'),
  horaInicio: z.string().min(4, 'A hora de início é obrigatória.'),
  horaFim: z.string().min(4, 'A hora de fim é obrigatória.'),
  conteudoFormativo: z.string().min(3, 'O conteúdo formativo é obrigatório.'),
  metodologiaDeEnsino: z.string().min(3, 'A metodologia de ensino é obrigatória.'),
  recursosDidaticos: z.string().min(3, 'Os recursos didáticos são obrigatórios.'),
});

interface FormValues {
  data: string;
  horaInicio: string;
  horaFim: string;
  conteudoFormativo: string;
  metodologiaDeEnsino: string;
  recursosDidaticos: string;
}

export const Route = createFileRoute('/update-lesson-plan')({
  component: () => {
    return (
      <div className="flex flex-row h-screen relative mx-5">
        <div className="flex-grow flex flex-col items-center justify-start mt-5">
          <div className="w-full border border-[#C6C6C6] rounded-lg p-5">
            <Formik<FormValues>
              initialValues={{
                data: '18/10/2020',
                horaInicio: '18:30',
                horaFim: '20:30',
                conteudoFormativo: '',
                metodologiaDeEnsino: '',
                recursosDidaticos: '',
              }}
              validate={async (values) => {
                const errors: any = {};
                try {
                  await validationSchema.parseAsync(values);
                } catch (error) {
                  const fieldErrors = (error as any).flatten().fieldErrors;
                  Object.assign(errors, fieldErrors);
                }
                return errors;
              }}
              onSubmit={(values) => {
                console.log('Valores do formulário:', values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col space-y-6">
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
                    {errors.horaInicio && touched.horaInicio && <div className="text-red-500">{errors.horaInicio}</div>}
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
                    {errors.horaFim && touched.horaFim && <div className="text-red-500">{errors.horaFim}</div>}
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
                </Form>
              )}
            </Formik>
          </div>

          <div className="w-full border border-[#C6C6C6] rounded-lg p-5 mt-5">
            <div>Material Anexado:</div>
            <Link to="/">
              <Button>Acessar</Button>
            </Link>
          </div>


          <div className="flex justify-center mt-5 gap-2">
            <Button variant="lightTextBlack" size="large">Cancelar</Button>
            <Button size="large">Atualizar</Button>
          </div>
        </div>
      </div>
    );
  },
});
