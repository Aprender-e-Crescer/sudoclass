import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useClassRegisterController } from '@/controllers/use-class-register-controller'
import { classRegisterSchema } from '@/models/class-schema'
import { UpdateClassMutationData } from '@/mutations/use-update-class-mutation'
import { Select } from '@radix-ui/react-select'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { z } from 'zod'

import { toFormikValidationSchema } from 'zod-formik-adapter'

const validateSearch = z.object({
  // action: z.enum(['create', 'edit']),
  idClass: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/register/_register/$idCourse/class')({
  component: RegisterClass,
  validateSearch,
})

function RegisterClass() {
  const { idCourse } = Route.useParams()
  const { idClass } = Route.useSearch()
  const { createClass, updateClass } = useClassRegisterController(idCourse)

  const initialValues: UpdateClassMutationData = {
    idClass: idClass ?? '',
    name: '',
    color: '',
    shift: 'morning',
    startDate: new Date(),
    endDate: new Date(),
    subscriptionEndDate: new Date(),
    workload: 0,
    availableVacancies: 0,
    studentsProfile: [],
  }

  const handleClassOnSubmit = (data: typeof initialValues) => {
    const transformedData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      subscriptionEndDate: new Date(data.subscriptionEndDate),
    }
    // if (action === 'edit') {
    //   if (!idClass) throw new Error('Missing id')

    //   return updateClass({ ...transformedData, idClass })
    // }

    return createClass(transformedData)
  }
  return (
    <>
      <Formik
        onSubmit={handleClassOnSubmit}
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(classRegisterSchema)}
      >
        <FormBody cancelTo="/">
          <Input name="name" label="Nome da turma" type="text" placeholder="Aprender & Crescer 2025" />
          <Input name="workload" label="Carga horária" type="number" placeholder="500" />
          <Input name="workload" label="Carga aaaaaa" type="Select" placeholder="500" />
          <div className="flex gap-x-10 justify-start items-center">
            <Input name="startDate" label="Data de início" type="date" placeholder="01/01/2025" />
            <Input name="endDate" label="Data de término" type="date" placeholder="01/12/2025" />
            <Input
              name="subscriptionEndDate"
              label="Data de término das inscrições"
              type="date"
              placeholder="01/12/2025"
            />
            <Select name="shift">
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
          <Input name="availableVacancies" label="Número de vagas" type="number" placeholder="Número de vagas" />
        </FormBody>
      </Formik>
    </>
  )
}
