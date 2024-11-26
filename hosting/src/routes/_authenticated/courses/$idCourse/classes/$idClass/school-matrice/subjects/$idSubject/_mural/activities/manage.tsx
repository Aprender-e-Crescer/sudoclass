import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { Form, Formik, Field } from 'formik'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { useCreateActivityMutation } from '@/mutations/use-create-activity-mutation'
import { z } from 'zod'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']),
  idActivity: z.string().optional(),
})

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/activities/manage',
)({
  component: CreateActivity,
  validateSearch,
})

export function CreateActivity() {
  const { idSubject } = Route.useParams()
  const [deliveryDate, setDeliveryDate] = React.useState<string>('') // Use string para garantir a consistência de valor
  const { mutate: createActivity } = useCreateActivityMutation()

  const initialValues = {
    title: '',
    instruction: '',
    value: '',
    deliveryDate: deliveryDate,
    subjectId: idSubject,
  }

  const handleSubmit = async (values: any) => {
    try {
      const newActivity = {
        title: values.title,
        instruction: values.instruction,
        value: Number(values.value),
        deliveryDate: values.deliveryDate || '',
        subjectId: Number(values.subjectId),
      }

      console.log('Nova atividade:', newActivity)

      await createActivity(newActivity)
    } catch (e) {
      console.error('Erro ao adicionar atividade: ', e)
    }
  }

  return (
    <div className="flex h-full w-full mt-10 ">
      <div className="flex flex-col w-full">
        <div className="flex justify-around mx-10">
          <div className="flex flex-col w-full h-full border p-6 ">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validateOnBlur={true}
              validateOnChange={false}
            >
              {({ setFieldValue, errors, touched }) => (
                <Form>
                  <div className="flex flex-col gap-12">
                    <div>
                      <p>Título</p>
                      <Field name="title" placeholder="Digite o título" className="border rounded-sm w-full p-2" />
                      {touched.title && errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                    </div>
                    <div>
                      <p>Instruções</p>
                      <Field
                        name="instruction"
                        placeholder="Digite as instruções"
                        className="border p-7 rounded-sm w-full"
                      />
                      {touched.instruction && errors.instruction && (
                        <div className="text-red-500 text-sm">{errors.instruction}</div>
                      )}
                    </div>
                    <div className="w-32">
                      <p>Peso</p>
                      <InputWithoutLabel
                        id="value"
                        name="value"
                        placeholder="Digite o valor da atividade"
                        onChange={(e) => setFieldValue('value', e.target.value.replace(/\D/g, ''))}
                      />
                      {touched.value && errors.value && <div className="text-red-500 text-sm">{errors.value}</div>}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p>Data de entrega</p>
                        <input
                          type="date"
                          name="deliveryDate"
                          value={deliveryDate}
                          onChange={(e) => {
                            setDeliveryDate(e.target.value)
                            setFieldValue('deliveryDate', e.target.value)
                          }}
                          className="border p-2 rounded-sm"
                        />
                        {touched.deliveryDate && errors.deliveryDate && (
                          <div className="text-red-500 text-sm">{errors.deliveryDate}</div>
                        )}
                      </div>

                      <Button type="submit" size="medium">
                        Criar atividade
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
