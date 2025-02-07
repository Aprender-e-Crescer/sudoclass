import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'
import { useAdminManagingController } from '@/controllers/use-admin-managing-controller'
import { masks } from '@/utils/masks'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { isValidCPF } from '../../../../../../functions/src/utils/isValidCPF'

const adminSchema = z.object({
  fullName: z.string(),
  cpf: z.string().refine(isValidCPF, "Inválido"),
})

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).default('create'),
  id: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/users/register/admin')({
  component: RouteComponent,
  validateSearch,
})

function RouteComponent() {
  const { action, id } = Route.useSearch()

  const { createAdmin, updateAdmin } = useAdminManagingController()

  const initialValues = { fullName: '', cpf: '' }

  const handleAdminOnSubmit = (data: typeof initialValues) => {
    if (action === 'edit') {
      if (!id) throw new Error('Missing id')
            
      return updateAdmin({ id, ...data })
    }
    
    return createAdmin(data)
  }

  return (
    <>
      <Formik onSubmit={handleAdminOnSubmit} initialValues={initialValues} validationSchema={toFormikValidationSchema(adminSchema)}>
        <FormBody cancelTo='/users'>
          <Input name='fullName' label='Nome completo' type='text' placeholder='Nome completo' />
          <Input name='cpf' label='CPF' type='text' placeholder='000.000.000-00' mask={masks.BRL_CPF} />
        </FormBody>
      </Formik>
    </>
  )
}
