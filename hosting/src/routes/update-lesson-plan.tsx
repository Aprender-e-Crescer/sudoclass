import { createFileRoute } from '@tanstack/react-router';
import { Formik, Form, Field, FieldProps } from 'formik';
import { z } from 'zod';
import { InputForm } from '@/components/custom/text-input';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/custom/header'; 

const validationSchema = z.object({
    data: z.string().min(8, 'A data é obrigatória.'),
    horaInicio: z.string().min(4, 'A hora de início é obrigatória.'),
    horaFim: z.string().min(4, 'A hora de fim é obrigatória.'),
});

interface FormValues {
    data: string;
    horaInicio: string;
    horaFim: string;
}

export const Route = createFileRoute('/update-lesson-plan')({
    component: () => (
        <div className="flex flex-col">
            <Header avatarImage="@/src/assets/avatarLogo.svg" avatarFallBack="" />
            <div className="flex justify-center w-full mt-5">
                <div className="border border-[#C6C6C6] rounded-lg p-5 w-full">
                    <Formik<FormValues>
                        initialValues={{
                            data: '18/10/2020',
                            horaInicio: '18:30',
                            horaFim: '20:30',
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
                                    {errors.data && touched.data && <div>{errors.data}</div>}
                                </div>

                                <div>
                                    <h1>Início</h1>
                                    <Field name="horaInicio">
                                        {({ field }: FieldProps) => (
                                            <InputForm
                                                type="time"
                                                placeholder="Hora de início"
                                                id="horaInicio"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    {errors.horaInicio && touched.horaInicio && <div>{errors.horaInicio}</div>}
                                </div>

                                <div>
                                    <h1>Fim</h1>
                                    <Field name="horaFim">
                                        {({ field }: FieldProps) => (
                                            <InputForm
                                                type="time"
                                                placeholder="Hora de fim"
                                                id="horaFim"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    {errors.horaFim && touched.horaFim && <div>{errors.horaFim}</div>}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className='flex justify-center mt-5 gap-2'>
                <Button variant='lightTextBlack' size='large'>Enviar</Button>
                <Button size='large'>Enviar</Button>
            </div>
        </div>
    ),
});
