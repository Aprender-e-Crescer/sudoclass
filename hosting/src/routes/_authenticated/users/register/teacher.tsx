import { FormBody } from '@/components/custom/form/body'
import { ComboBox } from '@/components/custom/form/combo-box'
import { Input } from '@/components/custom/form/input'
import { InputFile } from '@/components/custom/form/input-file'
import { Select } from '@/components/custom/form/select'
import { citiesAndStates } from '@/constants/citiesAndStates'
import { useTeacherManagingController } from '@/controllers/use-teacher-managing-controller'
import { getClassesQueriesOptions } from '@/queries/use-get-classes-query'
import { getCoursesQueryOptions } from '@/queries/use-get-courses-query'
import { getUserProfileQueryOptions } from '@/queries/use-get-user-profile-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { getStringInputValueFromDate } from '@/utils/dateToStringInputValueFormatter'
import { formatWithMask } from '@/utils/formatWithMask'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { masks } from '@/utils/masks'
import { ensureCPFUniqueSchema, telephoneSchema } from '@/utils/schema'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Formik, FormikProps } from 'formik'
import { useRef } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).default('create'),
  id: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/users/register/teacher')({
  loader: async ({ context: { queryClient }, location: { search } }) => {
    try {
      const { id } = z.object({
        id: z.string(),
      }).parse(search)

      const user = await queryClient.ensureQueryData(getUserQueryOptions(id))

      const userData = user.data()

      if (!userData) throw new Error('User not found')

      await queryClient.ensureQueryData(getUserProfileQueryOptions(userData.profileRef.id))

      const role = getRoleFromRef(userData?.roleRef)

      const teacher = await queryClient.ensureQueryData(getTeacherPersonalSubjectsQueryOptions(role, userData?.roleRef))
      
      const courses = await queryClient.ensureQueryData(getCoursesQueryOptions(role, undefined, teacher?.data()?.subjects))

      const classesQueriesOptions = getClassesQueriesOptions(courses.docs.map(course => course.data()), role, undefined, teacher?.data()?.subjects)

      await Promise.all(classesQueriesOptions.map(({ classesQueryOptions }) => queryClient.ensureQueryData(classesQueryOptions)))
    } catch {
      return;
    }
  },
  component: RouteComponent,
  validateSearch,
})

function RouteComponent() {
  const { action, id } = Route.useSearch()

  const formikRef = useRef<FormikProps<typeof initialValues>>(null)

  const { createTeacher, updateTeacher, user, teacher, documents, documentsQueryFilters, subjectsWithClassesAndCourses } = useTeacherManagingController(id)

  const queryClient = useQueryClient()

  const teacherSchema = z.object({
    fullName: z.string(),
    cpf: ensureCPFUniqueSchema(action, queryClient),
    email: z.string().email(),
    telephone: telephoneSchema,
    state: z.string(),
    city: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    number: z.string(),
    birthDate: z.string(),
    birthState: z.string(),
    birthCity: z.string(),
    grNumber: z.string(),
    grDispatchDate: z.string(),
    grDispatchState: z.string(),
    documents: z.array(z.instanceof(File)).min(1),
    subjects: z.array(z.string()).min(1)
  })

  const initialValues = {
    fullName: user?.fullName ?? '',
    cpf: user?.id ?? '',
    email: user?.contact?.email ?? '',
    telephone: user?.contact?.telephone ?? '',
    state: user?.address?.state ?? '',
    city: user?.address?.city ?? '',
    street: user?.address?.street ?? '',
    neighborhood: user?.address?.neighborhood ?? '',
    number: user?.address?.number ?? '',
    birthDate: getStringInputValueFromDate(user?.birth?.date),
    birthState: user?.birth?.state ?? '',
    birthCity: user?.birth?.city ?? '',
    grNumber: user?.generalRegistration?.number ?? '',
    grDispatchDate: getStringInputValueFromDate(user?.generalRegistration?.dispatch.date),
    grDispatchState: user?.generalRegistration?.dispatch.state ?? '',
    documents: documents ?? [],
    subjects: teacher?.subjects.map((subjectRef) => subjectRef.path) ?? [],
  }

  const handleOnSubmit = ({ cpf, ...data }: z.infer<typeof teacherSchema>) => {
    const dataCleaned = {
      ...data,
      birthDate: new Date(data.birthDate),
      grDispatchDate: new Date(data.grDispatchDate),
      telephone: formatWithMask({
        text: data.telephone,
        mask: masks.BRL_PHONE,
      }).unmasked,
      cpf: formatWithMask({
        text: cpf,
        mask: masks.BRL_CPF,
      }).unmasked,
    };

    if (action === 'edit') {
      if (!id) throw new Error('Missing id')
            
      return updateTeacher({ id, ...dataCleaned })
    }
    
    return createTeacher(dataCleaned)
  }

  return (
    <>
      <Formik innerRef={formikRef} enableReinitialize onSubmit={handleOnSubmit} initialValues={initialValues} validationSchema={toFormikValidationSchema(teacherSchema)}>
        <FormBody title='Professor' action={action} cancelTo='/users'>
          <Input
            name='cpf'
            label='CPF'
            type='text'
            placeholder='000.000.000-00'
            mask={masks.BRL_CPF}
            disabled={action === 'edit'}
            filtersQueryToShowLoading={(cpf) => ({
              queryKey: getUserQueryOptions(
                formatWithMask({
                  text: cpf,
                  mask: masks.BRL_CPF,
                }).unmasked
              ).queryKey
            })}
          />
          <Input name='fullName' label='Nome completo' type='text' placeholder='Nome completo' />

          <ComboBox
            name='subjects'
            label='Máterias'
            notFoundItemsMessage="Nenhuma máteria encontrada"
            placeholder='Selecionar turmas'
            options={subjectsWithClassesAndCourses.map(({ id, name, courseName, className, ref }) => ({
              key: id,
              label: `${courseName} - ${className} - ${name}`,
              value: ref.path,
            }))}
          />
          
          <div className='sm:flex gap-x-4 flex-1'>
            <Input name='email' label='E-mail' type='email' placeholder='E-mail' />
            <Input name='telephone' label='Telefone' type='text' placeholder='Telefone' mask={masks.BRL_PHONE} />
          </div>
          
          <div className='sm:flex gap-x-4 flex-1'>
            <Select
              name='state'
              label='Estado'
              onChange={() => formikRef.current?.setFieldValue('city', '')}
              options={() => (
                <>
                  <option disabled value="">Selecione uma opção</option>
                  {citiesAndStates.states.map(({ uf, name }) => <option value={uf} key={uf}>{name}</option>)}
                </>
              )}
            />
            <Select
              name='city'
              label='Cidade'
              disabled={(_, values) => !values['state']}
              options={({ values }) => 
                <>
                  <option disabled value="">Selecione uma opção</option>
                  {citiesAndStates.states
                      .find(({ uf }) => uf === values['state'])?.cities
                      .map((city) => <option value={city} key={city}>{city}</option>)}
                </>
              }
            />
          </div>
          
          <Input name='street' label='Rua' type='text' placeholder='Rua' />
          <div className='sm:flex gap-x-4 flex-1'>
            <Input name='neighborhood' label='Bairro' type='text' placeholder='Bairro' />
            <Input name='number' label='Número' type='text' placeholder='Número' />
          </div>
          
          <Input name='birthDate' label='Data de nascimento' type='date' placeholder='Data de nascimento' />
          <div className='sm:flex gap-x-4 flex-1'>
            <Select
              name='birthState'
              label='Estado de nascimento'
              onChange={() => formikRef.current?.setFieldValue('birthCity', '')}
              options={() => (
                <>
                  <option disabled value="">Selecione uma opção</option>
                  {citiesAndStates.states.map(({ uf, name }) => <option value={uf} key={uf}>{name}</option>)}
                </>
              )}
            />
            <Select
              name='birthCity'
              label='Cidade de nascimento'
              disabled={(_, values) => !values['birthState']}
              options={({ values }) => 
                <>
                  <option disabled value="">Selecione uma opção</option>
                  {citiesAndStates.states
                      .find(({ uf }) => uf === values['birthState'])?.cities
                      .map((city) => <option value={city} key={city}>{city}</option>)}
                </>
              }
            />
          </div>

          <div className='sm:flex gap-x-4 flex-1'>
            <Input name='grNumber' label='RG' type='text' placeholder='RG' />
            <Input name='grDispatchDate' label='Data de expedição RG' type='date' placeholder='Data de expedição RG' />
          </div>
          <Select
              name='grDispatchState'
              label='Estado de expedição RG'
              options={() => (
                <>
                  <option disabled value="">Selecione uma opção</option>
                  {citiesAndStates.states.map(({ uf, name }) => <option value={uf} key={uf}>{name}</option>)}
                </>
              )}
            />
          
          <InputFile name='documents' label='Anexar documentos' type='file' multiple filtersQueryToShowLoading={documentsQueryFilters} />
        </FormBody>
      </Formik>
    </>
  )
}
