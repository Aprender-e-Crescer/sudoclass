import { InputFile } from '@/components/custom/file-input'
import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { useRegisterAdminController } from '@/controllers/admin-register-controller'
import { RegistrationAdminSchema } from '@/models/admin-registration-schema'
import { PEDAGOGUES_QUERY_KEY, usePedagogueListQuery } from '@/queries/use-list-admin-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { When } from 'react-if'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import avatar from '@/assets/avatar.png'
import { useQueryClient } from '@tanstack/react-query'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).optional(),
  idAdmin: z.string().optional(),
})

export const Route = createFileRoute(
  '/_authenticated/register/_register/pedagogo/',
)({
  component: AdminListing,
  validateSearch,
})

const initialValues = {
  nome: '',
  cpf: '',
  senha: '',
  contato: '', 
}

function useLogic() {
  const { registerAdmin } = useRegisterAdminController()
  const { data: adminRequests } = usePedagogueListQuery()
  const { idAdmin, action } = Route.useSearch()
  const queryClient = useQueryClient()

  const handleOnAdminSubmit = async (values: typeof initialValues) => {
    try {
      await registerAdmin(values)
      queryClient.invalidateQueries({ queryKey: PEDAGOGUES_QUERY_KEY }) 
    } catch (error) {
      console.error('Erro ao registrar administrador:', error)
    }
  }
  

  return { handleOnAdminSubmit, adminRequests, action }
}

export function AdminListing() {
  const { handleOnAdminSubmit, adminRequests, action } = useLogic()

  return (
    <div className="flex flex-col flex-1">
      <div className="flex sm:flex-row flex-col justify-between items-center">
        <h1 className="text-2xl font-bold">Administradores</h1>
        <Link to="/register/pedagogo" search={{ action: 'create' }}>
          <Button variant="blueButton" size="large">
            Cadastrar novo administrador
          </Button>
        </Link>
      </div>

      <div className="flex sm:flex-row flex-col">
        <div
          className="flex flex-1 flex-col p-3 data-[isAction=true]:w-2/6"
          data-isAction={!!action}
        >
          {adminRequests?.map(({ nome, cpf }: { nome: string; cpf: string }, index: number) => (
            <div key={cpf} className="flex justify-between items-start">
              <Link
                to="/register/pedagogo"
                search={{ action: 'edit' }}
                className="flex flex-col flex-1"
              >
                <div className="flex gap-x-4 my-2 items-center border p-3 cursor-pointer rounded-sm">
                  <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>carregando...</AvatarFallback>
                  </Avatar>
                  <p>{nome}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <When condition={!!action}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnAdminSubmit}
            validationSchema={toFormikValidationSchema(RegistrationAdminSchema)}
          >
            <Form className="p-1">
              <div className="flex flex-col flex-1 p-2 rounded-sm border-2">
                <InputForm
                  title="Nome completo"
                  placeholder="Nome completo"
                  id="nome"
                  name="nome"
                  label="nome"
                  customStyleInput="rounded-lg border-2 p-[6px]"
                />
                <InputForm
                  title="Senha"
                  placeholder="Senha padrão para o administrador"
                  id="senha"
                  name="senha"
                  label="senha"
                  customStyleInput="rounded-lg border-2 p-[6px]"
                />
                <InputForm
                  title="CPF"
                  placeholder="000.000.000-00"
                  id="cpf"
                  name="cpf"
                  label="cpf"
                  customStyleInput="rounded-lg border-2 p-[6px]"
                />
                <InputForm
                  title="Contato"
                  placeholder="(XX) XXXXX-XXXX"
                  id="contato"
                  name="contato"
                  label="contato"
                  customStyleInput="rounded-lg border-2 p-[6px]"
                />
                <InputFile
                  title="Anexar arquivos"
                  placeholder="ImagemDocumentoAnexado.png 90kb"
                  id="attachDocuments"
                  name="attachDocuments"
                  label="attachDocuments"
                />
                <div className="flex justify-center gap-5">
                  <Link to="/register/pedagogo">
                    <Button  variant="ghostBlack" size="large" className="w-64">
                      Cancelar
                    </Button>
                  </Link>
                  <Button type="submit" variant="blueButton" size="large" className="w-64">
                    Cadastrar
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
        </When>
      </div>
    </div>
  )
}
