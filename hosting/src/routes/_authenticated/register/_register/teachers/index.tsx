import { InputFile } from '@/components/custom/file-input'
import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { useRegisterTeacherController } from '@/controllers/teacher-register-controller'
import { registerSchema } from '@/models/teachers-schema'
import { useTeachersSchemaQuery } from '@/queries/use-teachers-listing-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { When } from 'react-if'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import avatar from '@/assets/avatar.png'
import { SubHeader } from '@/components/custom/subheader'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).optional(),
  idTeacher: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/register/_register/teachers/')({
  component: TeachersListing,
  validateSearch,
})

const initialValues = {
  municipality: '',
  neighborhood: '',
  number: '',
  road: '',
  state: '',
  birthCity: '',
  birthStatus: '',
  cpf: '',
  dateOfBirth: '',
  email: '',
  fullName: '',
  rgNumber: '',
  rgDispatchStatus: '',
  rgDispatchDate: '',
  telephone: '',
  password: '',
}

function useLogic() {
  const { registerTeacher } = useRegisterTeacherController()
  const { data: registerRequests } = useTeachersSchemaQuery()
  const { idTeacher, action } = Route.useSearch()

  const handleOnTeacherSubmit = (values: typeof initialValues) => {
    registerTeacher(values)
  }
  return { handleOnTeacherSubmit, registerRequests, action }
}

export function TeachersListing() {
  const { handleOnTeacherSubmit, registerRequests, action } = useLogic()

  return (
    <>
      <div className="flex flex-col flex-1">
        <div className="flex sm:flex-row flex-col justify-between items-center">
          <h1 className="text-2xl font-bold">Professores</h1>
          <Link to="/register/teachers" search={{ action: 'create' }}>
            <Button variant="blueButton" size="large">
              Cadastrar novo professor
            </Button>
          </Link>
        </div>

        <div className="flex sm:flex-row flex-col">
          <div className="flex flex-1 flex-col p-3 data-[isAction=true]:w-2/6" data-isAction={!!action}>
            {registerRequests?.map(({ fullName }, teacher, index) => (
              <div key={index} className="flex justify-between items-start">
                <Link to="/register/teachers" search={{ action: 'edit' }} className="flex flex-col flex-1">
                  <div className="flex gap-x-4 my-2 items-center border p-3 cursor-pointer rounded-sm">
                    <Avatar>
                      <AvatarImage src={avatar} />
                      <AvatarFallback>carregando...</AvatarFallback>
                    </Avatar>
                    <p>{fullName}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <When condition={!!action}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleOnTeacherSubmit}
              validationSchema={toFormikValidationSchema(registerSchema)}
            >
              <Form className="p-1">
                <div className=" flex-flex-col flex-1 p-2 rounded-sm border-2">
                  <InputForm
                    title="Nome completo"
                    placeholder="Nome completo"
                    id="fullName"
                    name="fullName"
                    label="fullName"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <InputForm
                    title="Email"
                    placeholder="professor@gmail.com"
                    id="email"
                    name="email"
                    label="email"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <InputForm
                    title="Telefone"
                    placeholder="(99) 99999-9999"
                    id="telephone"
                    name="telephone"
                    label="telephone"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <div className="flex gap-5 flex-wrap">
                    <InputForm
                      title="Estado"
                      placeholder="PR"
                      id="state"
                      name="state"
                      label="state"
                      customStyleInput="rounded-lg border-2 p-[6px]"
                    />
                    <InputForm
                      title="Municipio"
                      placeholder="Seu Municipio"
                      id="municipality"
                      name="municipality"
                      label="municipality"
                      customStyleInput="rounded-lg border-2 p-[6px]"
                    />
                  </div>
                  <InputForm
                    title="Rua"
                    placeholder="Rua"
                    id="street"
                    name="street"
                    label="street"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <div className="flex sm:gap-5 sm:flex-row flex-col">
                    <InputForm
                      title="Bairro"
                      placeholder="Bairro"
                      id="neighborhood"
                      name="neighborhood"
                      label="neighborhood"
                      customStyleInput="rounded-lg border-2 p-[6px]"
                    />

                    <InputForm
                      title="Numero"
                      placeholder="ex: 77"
                      id="houseNumber"
                      name="houseNumber"
                      label="houseNumber"
                      customStyleInput="rounded-lg border-2 p-[6px]"
                    />
                  </div>
                  <div className="flex gap-5 max-sm:gap-1 flex-wrap">
                    <InputForm
                      title="Data de nascimento"
                      placeholder="00/00/0000"
                      id="DateOfBirth"
                      name="DateOfBirth"
                      label="DateOfBirth"
                      type="date"
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
                      title="RG"
                      placeholder="00.000.000-0"
                      id="rgNumber"
                      name="rgNumber"
                      label="rgNumber"
                      customStyleInput="rounded-lg border-2 p-[6px]"
                    />
                  </div>
                  <InputForm
                    title="Data de expedição RG"
                    placeholder="data de expedição"
                    id="shippingDate"
                    name="shippingDate"
                    label="shippingDate"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <InputForm
                    title="Estado de expedição RG"
                    placeholder="estado de expedição"
                    id="shippingState"
                    name="shippingState"
                    label="shippingState"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <InputForm
                    title="Estado de nascimento"
                    placeholder="Estado"
                    id="birthStatus"
                    name="birthStatus"
                    label="birthStatus"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <InputForm
                    title="Cidade de nascimento"
                    placeholder="  Cidade"
                    id="birthCity"
                    name="birthCity"
                    label="birthCity"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <InputForm
                    title="Senha"
                    placeholder="Senha padrão para o professor"
                    id="password"
                    name="password"
                    label="password"
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
                    <Link to="/register/teachers">
                      <Button variant="ghostBlack" size="large" className="w-64">
                        Cancelar
                      </Button>
                    </Link>
                    <Button variant="blueButton" size="large" className="w-64">
                      Cadastrar
                    </Button>
                  </div>
                </div>
              </Form>
            </Formik>
          </When>
        </div>
      </div>
    </>
  )
}
