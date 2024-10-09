import { Formik, Form, Field } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { createFileRoute } from '@tanstack/react-router';
import { registerSchema } from '@/models/register-schema';
import { useRegisterSchemaQuery } from '@/queries/teachers-listing-query';
 
export const Route = createFileRoute('/teachers-listing')({
  component: TeachersListing,
});
 
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
};
 
export function TeachersListing() {
  const { data: registerRequests } = useRegisterSchemaQuery();
 
  return (
    <>
      <div>
        {registerRequests?.map(({ fullName, email, cpf }, index) => (
          <div key={index}>
            <p>
              Nome: {fullName}, Email: {email}, CPF: {cpf}
            </p>
          </div>
        ))}
      </div>
 
      <br />
      <br />
 
      <h1>Cadastro de Professor</h1>
 
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(registerSchema)}
        onSubmit={(values) => {
         
          console.log('Valores do formulário:', values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label>Município:</label>
              <Field type="text" name="municipality" />
              {touched.municipality && errors.municipality && (
                <div>{errors.municipality}</div>
              )}
            </div>
 
            <div>
              <label>Bairro:</label>
              <Field type="text" name="neighborhood" />
              {touched.neighborhood && errors.neighborhood && (
                <div>{errors.neighborhood}</div>
              )}
            </div>
 
            <div>
              <label>Número:</label>
              <Field type="text" name="number" />
              {touched.number && errors.number && <div>{errors.number}</div>}
            </div>
 
            <div>
              <label>Rua:</label>
              <Field type="text" name="road" />
              {touched.road && errors.road && <div>{errors.road}</div>}
            </div>
 
            <div>
              <label>Estado:</label>
              <Field type="text" name="state" />
              {touched.state && errors.state && <div>{errors.state}</div>}
            </div>
 
            <div>
              <label>Cidade de Nascimento:</label>
              <Field type="text" name="birthCity" />
              {touched.birthCity && errors.birthCity && (
                <div>{errors.birthCity}</div>
              )}
            </div>
 
            <div>
              <label>Estado Civil:</label>
              <Field type="text" name="birthStatus" />
              {touched.birthStatus && errors.birthStatus && (
                <div>{errors.birthStatus}</div>
              )}
            </div>
 
            <div>
              <label>CPF:</label>
              <Field type="text" name="cpf" />
              {touched.cpf && errors.cpf && <div>{errors.cpf}</div>}
            </div>
 
            <div>
              <label>Data de Nascimento:</label>
              <Field type="text" name="dateOfBirth" />
              {touched.dateOfBirth && errors.dateOfBirth && (
                <div>{errors.dateOfBirth}</div>
              )}
            </div>
 
            <div>
              <label>Email:</label>
              <Field type="email" name="email" />
              {touched.email && errors.email && <div>{errors.email}</div>}
            </div>
 
            <div>
              <label>Nome Completo:</label>
              <Field type="text" name="fullName" />
              {touched.fullName && errors.fullName && <div>{errors.fullName}</div>}
            </div>
 
            <div>
              <label>Número do RG:</label>
              <Field type="text" name="rgNumber" />
              {touched.rgNumber && errors.rgNumber && (
                <div>{errors.rgNumber}</div>
              )}
            </div>
 
            <div>
              <label>Status de Emissão do RG:</label>
              <Field type="text" name="rgDispatchStatus" />
              {touched.rgDispatchStatus && errors.rgDispatchStatus && (
                <div>{errors.rgDispatchStatus}</div>
              )}
            </div>
 
            <div>
              <label>Data de Emissão do RG:</label>
              <Field type="text" name="rgDispatchDate" />
              {touched.rgDispatchDate && errors.rgDispatchDate && (
                <div>{errors.rgDispatchDate}</div>
              )}
            </div>
 
            <div>
              <label>Telefone:</label>
              <Field type="text" name="telephone" />
              {touched.telephone && errors.telephone && (
                <div>{errors.telephone}</div>
              )}
            </div>
 
            <div>
              <label>Senha:</label>
              <Field type="password" name="password" />
              {touched.password && errors.password && <div>{errors.password}</div>}
            </div>
 
            <button type="submit">Cadastrar</button>
          </Form>
        )}
      </Formik>
    </>
  );
}
 
 