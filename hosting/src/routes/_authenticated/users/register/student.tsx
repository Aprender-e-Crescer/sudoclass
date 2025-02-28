import { FormBody } from '@/components/custom/form/body'
import { ComboBox } from '@/components/custom/form/combo-box'
import { Input } from '@/components/custom/form/input'
import { InputFile } from '@/components/custom/form/input-file'
import { Select } from '@/components/custom/form/select'
import { citiesAndStates } from '@/constants/citiesAndStates'
import { useStudentManagingController } from '@/controllers/use-student-managing-controller'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getClassesQueriesOptions } from '@/queries/use-get-classes-query'
import { getCoursesQueryOptions } from '@/queries/use-get-courses-query'
import { getUserProfileQueryOptions } from '@/queries/use-get-user-profile-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getStringInputValueFromDate } from '@/utils/dateToStringInputValueFormatter'
import { formatWithMask } from '@/utils/formatWithMask'
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

export const Route = createFileRoute('/_authenticated/users/register/student')({
  loader: async ({ context: { queryClient }, location: { search } }) => {
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions())
      
    const admin = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    const adminData = admin.data()

    if (!adminData) throw new Error('User not found')

    try {
      const { id } = z.object({
        id: z.string(),
      }).parse(search)

      const user = await queryClient.ensureQueryData(getUserQueryOptions(id))
      const userData = user.data()

      if (!userData) throw new Error('User not found')

      await queryClient.ensureQueryData(getUserProfileQueryOptions(userData.profileRef.id))

      const courses = await queryClient.ensureQueryData(getCoursesQueryOptions(adminData.role, undefined, undefined))

      const classesQueriesOptions = getClassesQueriesOptions(courses.docs.map(course => course.data()), adminData.role, undefined, undefined)

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

  const { createStudent, updateStudent, user, student, documents, documentsQueryFilters, allClasses } = useStudentManagingController(id)

  const queryClient = useQueryClient()

  const studentSchema = z.object({
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
    classes: z.array(z.string()).min(1)
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
    classes: student?.classes?.map((classRef) => classRef.path) ?? [],
  }

  const handleOnSubmit = ({ cpf, ...data }: z.infer<typeof studentSchema>) => {
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
            
      return updateStudent({ id, ...dataCleaned })
    }
    
    return createStudent(dataCleaned)
  }

  return (
    <Formik innerRef={formikRef} enableReinitialize onSubmit={handleOnSubmit} initialValues={initialValues} validationSchema={toFormikValidationSchema(studentSchema)}>
      <FormBody title='Aluno' action={action} cancelTo='/users'>
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
          name='classes'
          label='Turmas'
          notFoundItemsMessage="Nenhuma turma encontrada"
          placeholder='Selecionar turmas'
          options={allClasses.map(({ id, name, courseName, ref }) => ({
            key: id,
            label: `${courseName} - ${name}`,
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
  )
}