import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'
import { useAdminManagingController } from '@/controllers/use-admin-managing-controller'
import { masks } from '@/utils/masks'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { isValidCPF } from '../../../../../../functions/src/utils/isValidCPF'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getUserProfileQueryOptions } from '@/queries/use-get-user-profile-query'
import { formatWithMask } from '@/utils/formatWithMask'

const adminSchema = z.object({
  fullName: z.string(),
  cpf: z.string().refine(isValidCPF, "Inválido"),
})

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).default('create'),
  id: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/users/register/admin')({
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

  const { createAdmin, updateAdmin, user } = useAdminManagingController(id)

  const initialValues = { fullName: user?.fullName ?? '', cpf: user?.id ?? '' }

  const handleAdminOnSubmit = ({ cpf, fullName }: typeof initialValues) => {
    const dataCleaned = {
      fullName,
      cpf: formatWithMask({
        text: cpf,
        mask: masks.BRL_CPF,
      }).unmasked
    };

    if (action === 'edit') {
      if (!id) throw new Error('Missing id')
            
      return updateAdmin({ id, ...dataCleaned })
    }
    
    return createAdmin(dataCleaned)
  }

  return (
    <>
      <Formik enableReinitialize onSubmit={handleAdminOnSubmit} initialValues={initialValues} validationSchema={toFormikValidationSchema(adminSchema)}>
        <FormBody cancelTo='/users'>
          <Input name='fullName' label='Nome completo' type='text' placeholder='Nome completo' />
          <Input name='cpf' label='CPF' type='text' placeholder='000.000.000-00' mask={masks.BRL_CPF} />
        </FormBody>
      </Formik>
    </>
  )
}
