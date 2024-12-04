import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { useRegisterTeacherController } from '@/controllers/teacher-controller'
import { registerTeacherSchema } from '@/models/teachers-schema'
import { useTeachersListingQuery } from '@/queries/use-teachers-listing-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { Else, If, Then, When } from 'react-if'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import avatar from '@/assets/avatar.png'
import { X } from 'lucide-react'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).optional(),
  idTeacher: z.number().optional(),
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
  // password: '',
}

function useLogic() {
  const { registerTeacher, updateTeacher, deleteTeacher } = useRegisterTeacherController()
  const { action, idTeacher } = Route.useSearch()
  const { data: registerRequests } = useTeachersListingQuery()

  const handleOnCreateOrEditSubmit = (values: typeof initialValues) => {
    if (idTeacher && action === 'edit')
      return updateTeacher({
        idTeacher,
        bairro: values.neighborhood,
        cidadedenascimento: values.birthCity,
        cpf: values.cpf,
        datadeexpedicaorg: new Date(values.rgDispatchDate),
        datanasc: values.dateOfBirth,
        email: values.email,
        estado: values.state,
        estadodeexpedicaorg: values.rgDispatchStatus,
        estadonascimento: values.birthStatus,
        municipio: values.municipality,
        nome: values.fullName,
        numero: values.number,
        rg: values.rgNumber,
        rua: values.road,
      })

    return registerTeacher({
      bairro: values.neighborhood,
      cidadedenascimento: values.birthCity,
      cpf: values.cpf,
      datadeexpedicaorg: new Date(values.rgDispatchDate),
      datanasc: values.dateOfBirth,
      email: values.email,
      estado: values.state,
      estadodeexpedicaorg: values.rgDispatchStatus,
      estadonascimento: values.birthStatus,
      municipio: values.municipality,
      nome: values.fullName,
      numero: values.number,
      rg: values.rgNumber,
      rua: values.road,
    })
  }

  return { registerRequests, action, handleOnCreateOrEditSubmit, deleteTeacher }
}

export function TeachersListing() {
  const { registerRequests, action, handleOnCreateOrEditSubmit, deleteTeacher } = useLogic()

  return (
    <>
      <div className="flex flex-col flex-1 mt-2">
        <div className="flex sm:flex-row flex-col justify-between items-center">
          <h1 className="text-2xl font-bold">Professores</h1>
          <Link to="/register/teachers" search={{ action: 'create' }}>
            <Button variant="blueButton" size="large">
              Cadastrar novo professor
            </Button>
          </Link>
        </div>

        <div className="flex sm:flex-row flex-col">
          <div className="flex flex-1 flex-col p-3 data-[isaction=true]:max-w-96" data-isaction={!!action}>
            {registerRequests?.map(({ fullName, idTeacher }, index) => (
              <div key={index} className="flex justify-between items-start">
                <Link
                  to="/register/teachers"
                  search={{ action: 'edit', idTeacher: idTeacher }}
                  params={{ idTeacher: idTeacher }}
                  className="flex flex-col flex-1"
                >
                  <div className="flex gap-x-4 my-2 items-center border p-3 cursor-pointer rounded-sm">
                    <Avatar>
                      <AvatarImage src={avatar} />
                      <AvatarFallback>carregando...</AvatarFallback>
                    </Avatar>
                    <p>{fullName}</p>
                  </div>
                </Link>
                <X onClick={() => deleteTeacher(idTeacher)} className="cursor-pointer" />
              </div>
            ))}
          </div>
          <When condition={!!action}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleOnCreateOrEditSubmit}
              validationSchema={toFormikValidationSchema(registerTeacherSchema)}
            >
              <Form className="flex flex-col flex-1 p-1">
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
                    id="road"
                    name="road"
                    label="road"
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
                      id="number"
                      name="number"
                      label="number"
                      customStyleInput="rounded-lg border-2 p-[6px]"
                    />
                  </div>
                  <div className="flex gap-5 max-sm:gap-1 flex-wrap">
                    <InputForm
                      title="Data de nascimento"
                      placeholder="00/00/0000"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      label="dateOfBirth"
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
                    id="rgDispatchDate"
                    name="rgDispatchDate"
                    label="rgDispatchDate"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                    type="date"
                  />
                  <InputForm
                    title="Estado de expedição RG"
                    placeholder="estado de expedição"
                    id="rgDispatchStatus"
                    name="rgDispatchStatus"
                    label="rgDispatchStatus"
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
                  <div className="flex justify-center gap-5">
                    <Link to="/register/teachers">
                      <Button variant="ghostBlack" size="large" className="w-64">
                        Cancelar
                      </Button>
                    </Link>
                    <If condition={action === 'create'}>
                      <Then>
                        <Button variant="blueButton" size="large" className="w-64">
                          Cadastrar
                        </Button>
                      </Then>
                      <Else>
                        <Button variant="blueButton">Editar</Button>
                      </Else>
                    </If>
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
