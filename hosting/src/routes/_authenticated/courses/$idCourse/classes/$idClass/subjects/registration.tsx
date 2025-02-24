import { DefaultPendingComponent } from '@/components/custom/default-pending-component'
import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'
import { useSubjectRegisterController } from '@/controllers/use-subject-register-controller'
import { subjectsRegisterSchema } from '@/models/subjects-schema'
import { getSubjectQueryOptions } from '@/queries/use-get-subject-by-id-query'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).default('create'),
  idSubject: z.string().optional(),
})

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/registration',
)({
  loader: async ({ context: { queryClient }, params: { idClass, idCourse }, location: { search } }) => {
    try {
      const { idSubject } = z.object({
        idSubject: z.string(),
      }).parse(search)

      const subject = await queryClient.fetchQuery(getSubjectQueryOptions(idCourse, idClass, idSubject))
      const subjectData = subject.data()

      if (!subjectData) throw new Error('Subject not found')

      return subjectData
    } catch {
      return;
    }
  },
  component: RegisterSubject,
  validateSearch,
})

function RegisterSubject() {
  const subject = Route.useLoaderData()
  const { idCourse, idClass } = Route.useParams()
  const { action, idSubject } = Route.useSearch()
  
  const { createSubject, editSubject } = useSubjectRegisterController(
    idCourse,
    idClass,
  )

  if (action === 'edit' && !subject) return <DefaultPendingComponent /> 

  const initialValues = {
    name: subject?.name ?? '',
    workload: subject?.workload ?? 0,
    color: subject?.color ?? '#000000',
  }

  const handleSubmit = (data: typeof initialValues) => {
    if (action === 'edit' && idSubject) {
      return editSubject({ id: idSubject, ...data })
    }
    return createSubject(data)
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(subjectsRegisterSchema)}
      >
        {({ values, setFieldValue }) => (
          <div className="mx-10 sm:mx-40">
            <FormBody cancelTo="/courses/$idCourse/classes/$idClass/management">
              <Input
                name="name"
                label="Nome da turma"
                type="text"
                placeholder="Aprender & Crescer 2025"
              />
              <div className="flex w-full gap-x-10">
                <Input
                  name="workload"
                  label="Carga horária"
                  type="number"
                  placeholder="500"
                />
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
            </FormBody>
          </div>
        )}
      </Formik>
    </>
  )
}
