import { InputForm } from '@/components/custom/generics-inputs';
import { createFileRoute } from '@tanstack/react-router';
import { Formik, Form } from 'formik';
 
export const Route = createFileRoute('/')({
  component: teachrsForms,
});
 
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
  };
 
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6"></h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('Valores do formulário:', values);
        }}
      >
        {({ getFieldProps, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
                <h1 className='strnong'>Nome Completo</h1>
            <div className="mb-4">
              <InputForm
                label="Nome completo"
                placeholder="Digite seu nome completo"
                id="fullName"
                type="text"
                {...getFieldProps('fullName')}
              />
            </div>
            </div>
            <div>
            <h1 className='strnong'>Email</h1>
            <div className="mb-4">
              <InputForm
                label="Email"
                placeholder="Digite seu email"
                id="email"
                type="text"
                {...getFieldProps('email')}
              />
            </div>
            </div>
            <div>
            <h1 className='strnong'>Telefone</h1>
            <div className="mb-4">
              <InputForm
                label="Telefone"
                placeholder="(99) 99999-9999"
                id="phone"
                type="text"
                {...getFieldProps('phone')}
              />
              </div>
            </div>
            <h1 className='strnong'>Estado</h1>
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <InputForm
                  label="Estado"
                  placeholder="Digite o estado"
                  id="state"
                  type="text"
                  {...getFieldProps('state')}
                />
              </div>
              <div className="w-1/2">
                <InputForm
                  label="Município"
                  placeholder="Digite o município"
                  id="city"
                  type="text"
                  {...getFieldProps('city')}
                />
              </div>
            </div>
            <div>
            <h1 className='strnong'>Rua</h1>
            <div className="mb-4">
              <InputForm
                label="Rua"
                placeholder="Digite a rua"
                id="street"
                type="text"
                {...getFieldProps('street')}
              />
            </div>
            </div>
            <div>  
            <div className="flex space-x-4 mb-4">
                <div>
                    <h1 className='strnong'>Bairro</h1>
                    <div className="w-1/2">
                        <InputForm
                        label="Bairro"
                        placeholder="bairro"
                        id="district"
                        type="text"
                        {...getFieldProps('district')}
                        />
                    </div>
                </div>
              <div>
                    <h1 className='strnong'>Bairro</h1>
                    <div className="w-1/2">
                        <InputForm
                        label="Número"
                        placeholder="numero"
                        id="number"
                        type="text"
                        {...getFieldProps('number')}
                        />
                    </div>
                </div>
            </div>
            </div>
            <div>
           
            <div className="flex space-x-4 mb-4">
                <div>
                    <h1 className='strnong'>Data de nacimento</h1>
                    <div className="w-1/3">
                        <InputForm
                        label="Data de nascimento"
                            placeholder="00/00/0000"
                        id="birthDate"
                        type="text"
                        {...getFieldProps('birthDate')}
                        />
                    </div>
                </div>
                <div>
                    <h1 className='strnong'>CPF</h1>
                    <div className="w-1/3">
                        <InputForm
                        label="CPF"
                        placeholder="000.000.000-00"
                        id="cpf"
                        type="text"
                        {...getFieldProps('cpf')}
                        />
                    </div>
                </div>
                <div>  
                <h1 className='strnong'>RG</h1>  
              <div className="w-1/3">
                <InputForm
                  label="RG"
                  placeholder="00.000"
                  id="rg"
                  type="text"
                  {...getFieldProps('rg')}
                />
              </div>
            </div>
            </div>
            </div>
            <div>
            <h1 className='strnong'>Data de exibicao RG</h1>
            <div className="mb-4">
              <InputForm
                label="Data de expedição do RG"
                placeholder="Digite a data de expedição"
                id="rgIssueDate"
                type="text"
                {...getFieldProps('rgIssueDate')}
              />
            </div>
            </div>
            <div>
            <h1 className='strnong'>Estado de exibicao RG</h1>
            <div className="mb-4">
              <InputForm
                label="Estado de expedição do RG"
                placeholder="Digite o estado de expedição"
                id="rgIssueState"
                type="text"
                {...getFieldProps('rgIssueState')}
              />
            </div>
            </div>
            <div>
            <h1 className='strnong'>Estado de nascimento</h1>
            <div className="mb-4">
              <InputForm
                label="Estado de nascimento"
                placeholder="Digite o estado de nascimento"
                id="birthState"
                type="text"
                {...getFieldProps('birthState')}
              />
            </div>
            </div>
            <div>
            <h1 className='strnong'>cidade de nascimento</h1>
            <div className="mb-4">
              <InputForm
                label="Cidade de nascimento"
                placeholder="Digite a cidade de nascimento"
                id="birthCity"
                type="text"
                {...getFieldProps('birthCity')}
              />
            </div>
            </div>
            <div>
            <h1 className='strnong'>Anexar documentos</h1>
            <div className="mb-4">
              <InputForm
                label="Anexar documentos"
                placeholder="ex:imagemDocumentoAnexado.png"
                id="documentAttachment"
                type="text"
                {...getFieldProps('documentAttachment')}
              />
            </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}