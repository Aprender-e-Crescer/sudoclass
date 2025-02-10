import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useClassRegisterController } from '@/controllers/use-class-register-controller'
import { classRegisterSchema } from '@/models/class-schema'
import { Select } from '@radix-ui/react-select'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { z } from 'zod'

import { toFormikValidationSchema } from 'zod-formik-adapter'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']),
  idClass: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/register/_register/$idCourse/class')({
  component: RegisterClass,
  validateSearch,
})

function RegisterClass() {
  const { idCourse } = Route.useParams()
  const { idClass, action } = Route.useSearch()
  const { createClass, updateClass } = useClassRegisterController(idCourse)

  const initialValues = {
    idClass: idClass ?? '',
    name: '',
    color: '',
    shift: 'morning',
    startDate: undefined,
    endDate: undefined,
    subscriptionEndDate: undefined,
    workload: 0,
    availableVacancies: 0,
    studentsProfile: [],
  }

  const handleClassOnSubmit = (data: typeof initialValues) => {
    if (!data.startDate || !data.endDate || !data.subscriptionEndDate) return
    const transformedData = {
      ...data,
      shift: data.shift as 'morning' | 'afternoon' | 'night',
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      subscriptionEndDate: new Date(data.subscriptionEndDate),
    }
    if (action === 'edit') {
      if (!idClass) throw new Error('Missing id')

      return updateClass({ ...transformedData, idClass })
    }

    return createClass(transformedData)
  }
  return (
    <>
      <Formik
        onSubmit={handleClassOnSubmit}
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(classRegisterSchema)}
      >
        {({ values, setFieldValue }) => (
          <FormBody cancelTo="/">
            <Input name="name" label="Nome da turma" type="text" placeholder="Aprender & Crescer 2025" />
            <Input name="workload" label="Carga horária" type="number" placeholder="500" />
            <Input name="availableVacancies" label="Número de vagas" type="number" placeholder="Número de vagas" />
            <div className="flex-col items-center">
              <Input name="startDate" label="Data de início" type="date" placeholder="01/01/2025" />
              <Input name="endDate" label="Data de término" type="date" placeholder="01/12/2025" />
              <Input
                name="subscriptionEndDate"
                label="Data de término das inscrições"
                type="date"
                placeholder="01/12/2025"
              />
              <div className="flex items-start gap-x-10">
                <div className="flex flex-col mb-4">
                  <p>Turnos</p>
                  <Select name="shift" value={values.shift} onValueChange={(value) => setFieldValue('shift', value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Turno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Manhã</SelectItem>
                      <SelectItem value="afternoon">Tarde</SelectItem>
                      <SelectItem value="night">Noite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col mt-1">
                  <label htmlFor="color">Cores</label>
                  <input
                    className="h-10"
                    type="color"
                    id="color"
                    name="color"
                    value={values.color}
                    onChange={(e) => setFieldValue('color', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </FormBody>
        )}
      </Formik>
    </>
  )
}
