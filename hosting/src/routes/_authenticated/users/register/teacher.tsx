import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'
import { masks } from '@/utils/masks'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { isValidCPF } from '../../../../../../functions/src/utils/isValidCPF'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getUserProfileQueryOptions } from '@/queries/use-get-user-profile-query'
import { formatWithMask } from '@/utils/formatWithMask'
import { useTeacherManagingController } from '@/controllers/use-teacher-managing-controller'
import { InputFile } from '@/components/custom/form/input-file'
import { getStringInputValueFromDate } from '@/utils/dateToStringInputValueFormatter'

const teacherSchema = z.object({
  fullName: z.string(),
  cpf: z.string().refine(isValidCPF, "Inválido"),
  email: z.string().email(),
  telephone: z.preprocess((value) => {
    if (typeof value !== 'string') return undefined

    return formatWithMask({
      text: value,
      mask: masks.BRL_PHONE,
    }).unmasked
  }, z.string().refine((value) => value.length === 11, "Inválido")),
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
  documents: z.array(z.instanceof(File)),
})

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

      return queryClient.ensureQueryData(getUserProfileQueryOptions(userData.profileRef.id))
    } catch {
      return;
    }
  },
  component: RouteComponent,
  validateSearch,
})

function RouteComponent() {
  const { action, id } = Route.useSearch()

  const { createTeacher, updateTeacher, user, documents, documentsQueryFilters } = useTeacherManagingController(id)

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
      <Formik enableReinitialize onSubmit={handleOnSubmit} initialValues={initialValues} validationSchema={toFormikValidationSchema(teacherSchema)}>
        <FormBody cancelTo='/users'>
          <Input name='cpf' label='CPF' type='text' placeholder='000.000.000-00' mask={masks.BRL_CPF} />
          <Input name='fullName' label='Nome completo' type='text' placeholder='Nome completo' />
          
          <Input name='email' label='E-mail' type='email' placeholder='E-mail' />
          <Input name='telephone' label='Telefone' type='text' placeholder='Telefone' mask={masks.BRL_PHONE} />

          <Input name='state' label='Estado' type='text' placeholder='Estado' />
          <Input name='city' label='Cidade' type='text' placeholder='Cidade' />
          <Input name='street' label='Rua' type='text' placeholder='Rua' />
          <Input name='neighborhood' label='Bairro' type='text' placeholder='Bairro' />
          <Input name='number' label='Número' type='text' placeholder='Número' />

          <Input name='birthDate' label='Data de nascimento' type='date' placeholder='Data de nascimento' />
          <Input name='birthState' label='Estado de nascimento' type='text' placeholder='Estado de nascimento' />
          <Input name='birthCity' label='Cidade de nascimento' type='text' placeholder='Cidade de nascimento' />

          <Input name='grNumber' label='RG' type='text' placeholder='RG' />
          <Input name='grDispatchDate' label='Data de expedição RG' type='date' placeholder='Data de expedição RG' />
          <Input name='grDispatchState' label='Estado de expedição RG' type='text' placeholder='Estado de expedição RG' />
          
          <InputFile name='documents' label='Anexar documentos' type='file' multiple filtersQueryToShowLoading={documentsQueryFilters} />
        </FormBody>
      </Formik>
    </>
  )
}
