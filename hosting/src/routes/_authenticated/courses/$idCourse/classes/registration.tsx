import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useClassRegisterController } from '@/controllers/use-class-register-controller'
import { getClassQueryOptions } from '@/queries/use-class-query'
import { getStringInputValueFromDate } from '@/utils/dateToStringInputValueFormatter'
import { docRefSchema, stringToDatePreprocessedSchema, stringToNumberPreprocessedSchema } from '@/utils/schema'
import { Select } from '@radix-ui/react-select'
import { createFileRoute } from '@tanstack/react-router'
import { Formik, FormikProps } from 'formik'
import debounce from 'lodash.debounce'
import { z } from 'zod'

import { useMemo, useRef } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const classRegisterSchema = z.object({
  name: z.string(),
  color: z.string(),
  shift: z.enum(['morning', 'afternoon', 'night']),
  startDate: stringToDatePreprocessedSchema,
  endDate: stringToDatePreprocessedSchema,
  subscriptionEndDate: stringToDatePreprocessedSchema,
  workload: stringToNumberPreprocessedSchema,
  availableVacancies: stringToNumberPreprocessedSchema,
  studentsProfile: z.array(docRefSchema),
})

const validateSearch = z.object({
  action: z.enum(['create', 'edit']),
  idClass: z.string().optional(),
})

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/registration',
)({
  loader: async ({ params: { idCourse }, location: { search }, context: { queryClient } }) => {
    try {
      const { idClass } = z.object({
        idClass: z.string(),
      }).parse(search)

      const classSnapshot = await queryClient.ensureQueryData(getClassQueryOptions(idCourse, idClass))
      return classSnapshot?.data()
    } catch {
      return;
    }
  },
  component: RegisterClass,
  validateSearch,
})

function RegisterClass() {
  const { idCourse } = Route.useParams()
  const { idClass, action } = Route.useSearch()
  const { createClass, updateClass } = useClassRegisterController(idCourse)

  const classData = Route.useLoaderData()

  const initialValues = {
    name: classData?.name ?? '',
    color: classData?.color ?? '',
    shift: classData?.shift ?? 'morning',
    startDate: getStringInputValueFromDate(classData?.startDate),
    endDate: getStringInputValueFromDate(classData?.endDate),
    subscriptionEndDate: getStringInputValueFromDate(classData?.subscriptionEndDate),
    workload: classData?.workload ?? 0,
    availableVacancies: classData?.availableVacancies ?? 0,
    studentsProfile: classData?.studentsProfile ?? [],
  }

  const handleClassOnSubmit = (data: typeof initialValues) => {
    const transformedData = classRegisterSchema.parse(data)

    if (action === 'edit') {
      if (!idClass) throw new Error('Missing id')

      return updateClass({ ...transformedData, idClass })
    }

    return createClass(transformedData)
  }

  const formikRef = useRef<FormikProps<typeof initialValues>>(null)

  const handleOnColorInputChange = useMemo(() => debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    formikRef.current?.setFieldValue('color', e.target.value)
  }, 100), [])

  return (
    <>
      <Formik
        innerRef={formikRef}
        onSubmit={handleClassOnSubmit}
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(classRegisterSchema)}
      >
        {({ values, setFieldValue }) => (
          <FormBody cancelTo="/courses/$idCourse/classes/management" action={action}>
            <Input
              name="name"
              label="Nome da turma"
              type="text"
              placeholder="Aprender & Crescer 2025"
            />
            <Input
              name="workload"
              label="Carga horária"
              type="number"
              placeholder="500"
            />
            <Input
              name="availableVacancies"
              label="Número de vagas"
              type="number"
              placeholder="Número de vagas"
            />
            <div className="flex-col items-center">
              <Input
                name="startDate"
                label="Data de início"
                type="date"
                placeholder="01/01/2025"
              />
              <Input
                name="endDate"
                label="Data de término"
                type="date"
                placeholder="01/12/2025"
              />
              <Input
                name="subscriptionEndDate"
                label="Data de término das inscrições"
                type="date"
                placeholder="01/12/2025"
              />
              <div className="flex items-start gap-x-10">
                <div className="flex flex-col mb-4">
                  <p>Turnos</p>
                  <Select
                    name="shift"
                    value={values.shift}
                    onValueChange={(value) => setFieldValue('shift', value)}
                  >
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
                    defaultValue={values.color}
                    onChange={handleOnColorInputChange}
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
