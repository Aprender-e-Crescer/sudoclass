import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'
import { useClassRegisterController } from '@/controllers/use-class-register-controller'
import { classSchema } from '@/models/class-schema'
import { UpdateClassMutationData } from '@/mutations/use-update-class-mutation'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validateSearch = z.object({
  idCourse: z.string(),
  action: z.enum(['create', 'edit']),
  idClass: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/register/$idCourse/class')({
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
    // if (action === 'edit') {
    //   if (!idClass) throw new Error('Missing id')

    //   return updateClass({ ...data, idClass })
    // }

    return createClass(data)
  }
  return (
    <>
      <Formik
        onSubmit={handleClassOnSubmit}
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(classSchema)}
      >
        <FormBody cancelTo="/">
          <Input name="name" label="Nome da turma" type="text" placeholder="Nome da turma" />
          <Input name="workload" label="workload" type="number" placeholder="Carga horária" />
          <Input name="availableVacancies" label="availableVacancies" type="number" placeholder="Número de vagas" />
        </FormBody>
      </Formik>
    </>
  )
}
