import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import { useCreateActivityMutation } from '@/mutations/use-create-activity-mutation'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'
import { correctionSchema } from '@/models/correction-schema'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Link } from 'lucide-react'

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
  const { idSubject, idCourse, idClass } = Route.useParams()
  const navigate = useNavigate()
  const { mutateAsync: createActivity } = useCreateActivityMutation()
  const [deliveryDate, setDeliveryDate] = React.useState<string>('')
  const [link, setLink] = React.useState<string>('') 
  const [linkToDisplay, setLinkToDisplay] = React.useState<string>('')

  const initialValues = {
    title: '',
    instruction: '',
    value: 10,
    deliveryDate: deliveryDate,
    subjectId: idSubject,
    link: '',
  }

  const validate = (values: any) => {
    const errors: any = {}
    const parsedValue = correctionSchema.safeParse(values)
    if (!parsedValue.success) {
      parsedValue.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message
      })
    }
    return errors
  }

  const handleSubmit = async (values: any) => {
    try {
      const newActivity = {
        title: values.title,
        instruction: values.instruction,
        value: values.value,
        deliveryDate: values.deliveryDate || '',
        subjectId: Number(values.subjectId),
        link: linkToDisplay || '',
      }

      console.log('Nova atividade:', newActivity)
      await createActivity(newActivity)
      navigate({
        to: `/courses/${idCourse}/classes/${idClass}/school-matrice/subjects/${idSubject}/activities`,
        replace: true,
      })
    } catch (e) {
      console.error('Erro ao adicionar atividade: ', e)
    }
  }

  return (
    <div className="flex w-full border h-screen">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="flex w-full gap-8">
            <div className="flex-col w-3/4 h-min ml-5">
              <div className="borderjustify-center items-center">
                <TitleField errors={errors} touched={touched} />
                <InstructionField errors={errors} touched={touched} />

                <h1 className="text-lg">Adicione um link</h1>
                <div className="flex gap-10 flex-col border justify-center items-center p-10">
                  <PopoverDemo setLink={setLink} setLinkToDisplay={setLinkToDisplay} />
                </div>
              </div>
            </div>

            <div className="w-1/4 h-min border p-4 mt-5 mr-5">
              <ValueField errors={errors} touched={touched} setFieldValue={setFieldValue} />
              <DeliveryDateField
                deliveryDate={deliveryDate}
                setDeliveryDate={setDeliveryDate}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <p>Link</p>
              <div className="w-full">
                {linkToDisplay && (
                  <a href={linkToDisplay} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    {linkToDisplay}
                  </a>
                )}
              </div>
              <div className="flex mt-6">
                <Button type="submit" size="manage">
                  Criar atividade
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export function PopoverDemo({ setLink, setLinkToDisplay }: any) {
  const [tempLink, setTempLink] = React.useState('')

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="border-2 rounded-full w-16 h-16 p-2 hover:scale-110 hover:bg-gray-200 
        hover:shadow-lg active:scale-90 active:bg-gray-300 transition-all"
      >
        <Link />
      </PopoverTrigger>
      <PopoverContent className="w-96 h">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h1 className="font-medium leading-none">Insira um link abaixo</h1>
          </div>
          <div className="grid gap-2">
            <Field
              name="link"
              placeholder="Digite um link"
              className="border rounded-sm w-full p-2"
              value={tempLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTempLink(e.target.value)
              }}
            />
            <Button
              size="medium"
              onClick={() => {
                setLinkToDisplay(tempLink)
                setLink('')
              }}
            >
              Salvar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function TitleField({ errors, touched }: any) {
  return (
    <div>
      <p>Título</p>
      <Field name="title" placeholder="Digite o título" className="border rounded-sm w-full p-2" />
      {touched.title && errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
    </div>
  )
}

function InstructionField({ errors, touched }: any) {
  return (
    <div>
      <p>Instruções</p>
      <Field
        as="textarea"
        name="instruction"
        placeholder="Digite as instruções"
        className="border p-2 rounded-sm w-full h-32 resize-none"
      />
      {touched.instruction && errors.instruction && <div className="text-red-500 text-sm">{errors.instruction}</div>}
    </div>
  )
}

function ValueField({ errors, touched, setFieldValue }: any) {
  return (
    <div>
      <p>Peso (de 0 a 10)</p>
      <Field
        as="select"
        name="value"
        className="border p-2 rounded-sm w-full bg-slate-200"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue('value', parseInt(e.target.value, 10))
        }}
      >
        {[...Array(11).keys()].map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </Field>
      {touched.value && errors.value && <div className="text-red-500 text-sm">{errors.value}</div>}
    </div>
  )
}

function DeliveryDateField({ deliveryDate, setDeliveryDate, setFieldValue, errors, touched }: any) {
  return (
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
        className="border p-2 rounded-sm bg-slate-200 w-full"
      />
      {touched.deliveryDate && errors.deliveryDate && <div className="text-red-500 text-sm">{errors.deliveryDate}</div>}
    </div>
  )
}
