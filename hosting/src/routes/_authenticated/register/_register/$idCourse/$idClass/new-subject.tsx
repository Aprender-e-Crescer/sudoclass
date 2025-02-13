import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'
import { useSubjectRegisterController } from '@/controllers/use-subject-register-controller'
import { subjectsRegisterSchema } from '@/models/subjects-schema'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']),
  idSubject: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/register/_register/$idCourse/$idClass/new-subject')({
  component: RegisterSubject,
  validateSearch,
})

function RegisterSubject() {
  const { idCourse, idClass } = Route.useParams()
  const { action, idSubject } = Route.useSearch()

  const { createSubject, editSubject } = useSubjectRegisterController(idCourse, idClass)

  const initialValues = {
    name: '',
    workload: 0,
    color: '#000000',
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
            <FormBody cancelTo="/">
              <Input name="name" label="Nome da turma" type="text" placeholder="Aprender & Crescer 2025" />
              <div className="flex w-full gap-x-10">
                <Input name="workload" label="Carga horária" type="number" placeholder="500" />
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
