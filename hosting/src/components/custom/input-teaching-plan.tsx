import { Button } from '../ui/button'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useCreateDailyTeachingPlan } from '@/mutations/use-add-teaching-plan'
import { dailyTeachingPlanSchema } from '@/models/daily-teaching-plan'
import { InputForm } from './text-input'
import { toFormikValidationSchema } from 'zod-formik-adapter'

interface InputTeachingPlansProps {
  schoolMatrixId: string
}

export function InputTeachingPlans({ schoolMatrixId }: InputTeachingPlansProps) {
  const mutation = useCreateDailyTeachingPlan(schoolMatrixId)

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 w-full">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-md lg:max-w-3xl">
        <Formik
          initialValues={{
            trainingContent: '',
            teachingMethodology: '',
            teachingResources: '',
            date: new Date().toISOString().substring(0, 10),
          }}
          validationSchema={toFormikValidationSchema(dailyTeachingPlanSchema)}
          onSubmit={(values, { resetForm }) => {
            mutation.mutate(values, {
              onSuccess: () => {
                alert('Plano de ensino salvo com sucesso!')
                resetForm()
              },
              onError: (error) => {
                alert('Erro ao salvar o plano de ensino: ' + error)
              },
            })
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4 sm:mb-6">
                <Field
                  name="trainingContent"
                  render={({ field }) => (
                    <InputForm
                      {...field}
                      title="Conteúdo do Treinamento"
                      placeholder="Insira um texto..."
                      type="textarea"
                      customStyleInput="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  )}
                />
                <ErrorMessage name="trainingContent" component="div" className="text-red-500" />
              </div>

              <div className="mb-4 sm:mb-6">
                <Field
                  name="teachingMethodology"
                  render={({ field }) => (
                    <InputForm
                      {...field}
                      title="Metodologia de Ensino"
                      placeholder="Insira um texto..."
                      type="textarea"
                      customStyleInput="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  )}
                />
                <ErrorMessage name="teachingMethodology" component="div" className="text-red-500" />
              </div>

              <div className="mb-4 sm:mb-6">
                <Field
                  name="teachingResources"
                  render={({ field }) => (
                    <InputForm
                      {...field}
                      title="Recursos Didáticos"
                      placeholder="Insira um texto..."
                      type="textarea"
                      customStyleInput="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  )}
                />
                <ErrorMessage name="teachingResources" component="div" className="text-red-500" />
              </div>

              <div className="mb-4 sm:mb-6">
                <Field
                  name="date"
                  render={({ field }) => (
                    <InputForm
                      {...field}
                      title="Data"
                      placeholder="Insira uma data..."
                      type="date"
                      customStyleInput="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  )}
                />
                <ErrorMessage name="date" component="div" className="text-red-500" />
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="blueButton" disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
