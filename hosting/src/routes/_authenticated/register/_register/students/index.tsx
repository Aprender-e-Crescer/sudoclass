import { InputFile } from '@/components/custom/file-input'
import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { useRegisterStudentController } from '@/controllers/student-register-controller'
import { studentSchema } from '@/models/student-schema'
import { STUDENTS_QUERY_KEY, useStudentsListQuery } from '@/queries/use-students-list-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { When } from 'react-if'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import avatar from '@/assets/avatar.png'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).optional(),
  idStudent: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/register/_register/students/')({
  component: StudentsListing,
  validateSearch,
})

const initialValues = {
  nome: '',
  email: '',
  cpf: '',
  telephone: '',
  address: {
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    streetNumber: '',
  },
  dateOfBirth: '',
  cityOfBirth: '',
  stateOfBirth: '',
  rg: '',
  shippingDate: '',
  shippingStatus: '',
  attachDocuments: '',
}

import { useQueryClient } from '@tanstack/react-query'


function useLogic() {
  const queryClient = useQueryClient() // Obtenha o cliente de queries
  const { registerStudent } = useRegisterStudentController()
  const { idStudent, action } = Route.useSearch()
  const { data: studentRequests } = useStudentsListQuery()

  const handleOnStudentSubmit = async (values: typeof initialValues) => {
    try {
      console.log(values)

      await registerStudent({
        nomeCompleto: values.name,
        attachDocuments: 'aaaaaaaaaaaaaaaaaa',
        estadodeexpedicaorg: values.stateOfBirth,
        estado: values.address.state,
        municipio: values.address.city,
        rua: values.address.street,
        bairro: values.address.neighborhood,
        numero: values.address.streetNumber,
        dataDeNascimento: values.dateOfBirth,
        dataExpedicaoRg: values.shippingDate,
        estadoDeNascimento: values.stateOfBirth,
        cidadeDeNascimeto: values.cityOfBirth,
        cpf: values.cpf,
        rg: values.rg,
        responsible: values.responsible || '',
        ...values,
      })

      queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY })
    } catch (error) {
      console.error('Erro ao registrar estudante:', error)
    }
  }

  return { handleOnStudentSubmit, studentRequests, action }
}



export function StudentsListing() {
  const { handleOnStudentSubmit, studentRequests, action } = useLogic()
  return (
    <div className="flex flex-col flex-1">
      <div className="flex sm:flex-row flex-col justify-between items-center">
        <h1 className="text-2xl font-bold">Estudantes</h1>
        <Link to="/register/students" search={{ action: 'create' }}>
          <Button variant="blueButton" size="large">
            Cadastrar novo estudante
          </Button>
        </Link>
      </div>

      <div className="flex sm:flex-row flex-col">
        <div className="flex flex-1 flex-col p-3 data-[isAction=true]:max-w-96" data-isaction={!!action}>
          {studentRequests?.map(({ nome }, index) => (
            <div key={index} className="flex justify-between items-start">
              <Link to="/register/students" search={{ action: 'edit' }} className="flex flex-col flex-1">
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
          <Formik initialValues={initialValues} onSubmit={handleOnStudentSubmit}>
            <Form className="p-1">
              <div className="flex flex-col flex-1 p-2 rounded-sm border-2">
                <InputForm
                  title="Nome completo"
                  placeholder="Nome completo"
                  id="name"
                  name="name"
                  label="name"
                  customStyleInput="rounded-lg border-2 p-[6px]"
                />
                <InputForm
                  title="Email"
                  placeholder="estudante@gmail.com"
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
                    name="address.state"
                    label="state"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <InputForm
                    title="Município"
                    placeholder="Seu Município"
                    id="municipality"
                    name="address.city"
                    label="municipality"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                </div>
                <InputForm
                  title="Rua"
                  placeholder="Rua"
                  id="street"
                  name="address.street"
                  label="street"
                  customStyleInput="rounded-lg border-2 p-[6px]"
                />
                <div className="flex sm:gap-5 sm:flex-row flex-col">
                  <InputForm
                    title="Bairro"
                    placeholder="Bairro"
                    id="neighborhood"
                    name="address.neighborhood"
                    label="neighborhood"
                    customStyleInput="rounded-lg border-2 p-[6px]"
                  />
                  <InputForm
                    title="Número"
                    placeholder="ex: 77"
                    id="streetNumber"
                    name="address.streetNumber"
                    label="streetNumber"
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
                    id="rg"
                    name="rg"
                    label="rg"
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
                  type="date"
                />
                <InputForm
                  title="Estado de expedição RG"
                  placeholder="estado de expedição"
                  id="shippingStatus"
                  name="shippingStatus"
                  label="shippingStatus"
                  customStyleInput="rounded-lg border-2 p-[6px]"
                />
                <InputForm
                  title="Estado de nascimento"
                  placeholder="Estado"
                  id="stateOfBirth"
                  name="stateOfBirth"
                  label="stateOfBirth"
                  customStyleInput="rounded-lg border-2 p-[6px]"
                />
                <InputForm
                  title="Cidade de nascimento"
                  placeholder="Cidade"
                  id="cityOfBirth"
                  name="cityOfBirth"
                  label="cityOfBirth"
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
                  <Link to="/register/students">
                    <Button variant="ghostBlack" size="large" className="w-64">
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
