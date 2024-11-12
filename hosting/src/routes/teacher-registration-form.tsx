import { InputForm } from '@/components/custom/text-input'
import { InputFile } from '@/components/custom/file-input'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Formik, Form } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { RegisterRequests, registerSchema } from '@/models/teachers-schema'
import { useRegisterTeacherController } from '@/controllers/teacher-register-controller'
import { parse } from "date-fns";

export const Route = createFileRoute('/teacher-registration-form')({
  component: TeacherRegistration,
})

const initialValues = {
  fullName: '',
  email: '',
  telephone: '',
  state: '',
  municipality: '',
  street: '',
  neighborhood: '',
  number: '',
  dateOfBirth: '',
  cpf: '',
  rgNumber: '',
  shippingDate: '',
  shippingState: '',
  birthStatus: '',
  birthCity: '',
  password: '',
  matter: '',
}

function useLogic() {
  const { registerTeacher } = useRegisterTeacherController();

  const handleOnTeacherSubmit = (values: typeof initialValues) => {
    registerTeacher(values);
  };

  return { handleOnTeacherSubmit };
}

export function TeacherRegistration() {
  const { handleOnTeacherSubmit } = useLogic()
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnTeacherSubmit}
        validationSchema={toFormikValidationSchema(registerSchema)}
      >
        <Form className="p-1">
          <div className=" p-2 rounded-sm border-2">
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
              <Button variant="ghostBlack" size="large" className="w-64">
                Cancelar
              </Button>
              <Button variant="blueButton" size="large" className="w-64">
                Atualizar
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}

