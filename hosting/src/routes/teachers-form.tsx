import { createFileRoute } from '@tanstack/react-router'
import { Formik, Form, ErrorMessage, Field } from 'formik'

export const Route = createFileRoute('/teachers-form')({
  component: teachrsForms,
})

export function teachrsForms() {
  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    street: '',
    district: '',
    number: '',
    birthDate: '',
    cpf: '',
    rg: '',
    rgIssueDate: '',
    rgIssueState: '',
    birthState: '',
    birthCity: '',
    documentAttachment: '',
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6"></h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('Valores do formulário:', values)
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <h1 className="strong">Nome Completo</h1>
              <div className="mb-4">
                <CustomInputForm
                  label="Nome completo"
                  placeholder="Digite seu nome completo"
                  id="fullName"
                  name="fullName"
                />
              </div>
            </div>
            <div>
              <h1 className="strong">Email</h1>
              <div className="mb-4">
                <CustomInputForm
                  label="Email"
                  placeholder="Digite seu email"
                  id="email"
                  name="email"
                />
              </div>
            </div>
            <div>
              <h1 className="strong">Telefone</h1>
              <div className="mb-4">
                <CustomInputForm
                  label="Telefone"
                  placeholder="(99) 99999-9999"
                  id="phone"
                  name="phone"
                />
              </div>
            </div>
            <h1 className="strong">Estado</h1>
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <CustomInputForm
                  label="Estado"
                  placeholder="Digite o estado"
                  id="state"
                  name="state"
                />
              </div>
              <div className="w-1/2">
                <CustomInputForm
                  label="Município"
                  placeholder="Digite o município"
                  id="city"
                  name="city"
                />
              </div>
            </div>
            <div>
              <h1 className="strong">Rua</h1>
              <div className="mb-4">
                <CustomInputForm
                  label="Rua"
                  placeholder="Digite a rua"
                  id="street"
                  name="street"
                />
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div>
                <h1 className="strong">Bairro</h1>
                <div className="w-1/2">
                  <CustomInputForm
                    label="Bairro"
                    placeholder="Digite o bairro"
                    id="district"
                    name="district"
                  />
                </div>
              </div>
              <div>
                <h1 className="strong">Número</h1>
                <div className="w-1/2">
                  <CustomInputForm
                    label="Número"
                    placeholder="Digite o número"
                    id="number"
                    name="number"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div>
                <h1 className="strong">Data de Nascimento</h1>
                <div className="w-1/3">
                  <CustomInputForm
                    label="Data de nascimento"
                    placeholder="00/00/0000"
                    id="birthDate"
                    name="birthDate"
                  />
                </div>
              </div>
              <div>
                <h1 className="strong">CPF</h1>
                <div className="w-1/3">
                  <CustomInputForm
                    label="CPF"
                    placeholder="000.000.000-00"
                    id="cpf"
                    name="cpf"
                  />
                </div>
              </div>
              <div>
                <h1 className="strong">RG</h1>
                <div className="w-1/3">
                  <CustomInputForm
                    label="RG"
                    placeholder="00.000"
                    id="rg"
                    name="rg"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="strong">Data de Expedição do RG</h1>
              <div className="mb-4">
                <CustomInputForm
                  label="Data de expedição do RG"
                  placeholder="Digite a data de expedição"
                  id="rgIssueDate"
                  name="rgIssueDate"
                />
              </div>
            </div>
            <div>
              <h1 className="strong">Estado de Expedição do RG</h1>
              <div className="mb-4">
                <CustomInputForm
                  label="Estado de expedição do RG"
                  placeholder="Digite o estado de expedição"
                  id="rgIssueState"
                  name="rgIssueState"
                />
              </div>
            </div>
            <div>
              <h1 className="strong">Estado de Nascimento</h1>
              <div className="mb-4">
                <CustomInputForm
                  label="Estado de nascimento"
                  placeholder="Digite o estado de nascimento"
                  id="birthState"
                  name="birthState"
                />
              </div>
            </div>
            <div>
              <h1 className="strong">Cidade de Nascimento</h1>
              <div className="mb-4">
                <CustomInputForm
                  label="Cidade de nascimento"
                  placeholder="Digite a cidade de nascimento"
                  id="birthCity"
                  name="birthCity"
                />
              </div>
            </div>
            <div>
              <h1 className="strong">Anexar Documentos</h1>
              <div className="mb-4">
                <CustomInputForm
                  label="Anexar documentos"
                  placeholder="ex: imagemDocumentoAnexado.png"
                  id="documentAttachment"
                  name="documentAttachment"
                />
              </div>
            </div>
            <div className="mb-4"></div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

interface CustomInputProps {
  title?: string
  label: string
  placeholder?: string
  id: string
  name: string
  customStyleLabel?: string
  customStyleButton?: string
}

export function CustomInputForm({
  title,
  label,
  name,
  placeholder,
  id,
  customStyleButton,
  customStyleLabel,
  type = 'text',
}: CustomInputProps & { type?: string }) {
  return (
    <label
      htmlFor={id}
      className={`${customStyleLabel ? customStyleLabel : 'flex flex-col flex-1 w-full mt-3'}`}
    >
      {title}
      <Field
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        className={`${customStyleButton ? customStyleButton : 'p-1 border border-gray-200'}`}
      />
    </label>
  )
}
