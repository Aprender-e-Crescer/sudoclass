import { InputForm } from '@/components/custom/text-input'
import { InputFile } from '@/components/custom/file-input'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Formik, Form } from 'formik'

export const Route = createFileRoute('/teacher-registration-form')({
  component: TeacherRegistration,
})

const initialValues = {
  teacherName: '',
  email: '',
  phoneNumber: '',
  state: '',
  city: '',
  street: '',
  neighborhood: '',
  houseNumber: '',
  dateOfBirth: '',
  CPF: '',
  RG: '',
  shippingDate: '',
  shippingState: '',
  stateOfBirth: '',
  cityOfBirth: '',
  attachDocuments: '',
}

export function TeacherRegistration() {
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        <Form className="p-1">
          <div className=" p-2 rounded-sm border-2">
            <InputForm
              title="Nome completo"
              placeholder="Nome completo"
              id="teacherName"
              name="teacherName"
              label="teacherName"
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
              id="phoneNumber"
              name="phoneNumber"
              label="phoneNumber"
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
                id="city"
                name="city"
                label="city"
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
                id="CPF"
                name="CPF"
                label="CPF"
                customStyleInput="rounded-lg border-2 p-[6px]"
              />
              <InputForm
                title="RG"
                placeholder="00.000.000-0"
                id="RG"
                name="RG"
                label="RG"
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
              id="stateOfBirth"
              name="stateOfBirth"
              label="stateOfBirth"
              customStyleInput="rounded-lg border-2 p-[6px]"
            />
            <InputForm
              title="Cidade de nascimento"
              placeholder="  Cidade"
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