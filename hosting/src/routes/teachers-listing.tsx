import React from "react";
import { Formik, Form, Field } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

// Esquema de validação com Zod
const CadastroSchema = z.object({
  municipality: z.string().nonempty("O campo 'Município' é obrigatório"),
  neighborhood: z.string().nonempty("O campo 'Bairro' é obrigatório"),
  number: z.string().nonempty("O campo 'Número' é obrigatório"),
  road: z.string().nonempty("O campo 'Rua' é obrigatório"),
  state: z.string().nonempty("O campo 'Estado' é obrigatório"),
  birthCity: z.string().nonempty("O campo 'Cidade de nascimento' é obrigatório"),
  birthStatus: z.string().nonempty("O campo 'Estado civil' é obrigatório"),
  cpf: z.string().nonempty("O campo 'CPF' é obrigatório"),
  dateOfBirth: z.string().nonempty("O campo 'Data de nascimento' é obrigatório"),
  email: z.string().email("Email inválido"),
  fullName: z.string().nonempty("O campo 'Nome completo' é obrigatório"),
  rgNumber: z.string().nonempty("O campo 'Número do RG' é obrigatório"),
  rgDispatchStatus: z
    .string()
    .nonempty("O campo 'Status de emissão do RG' é obrigatório"),
  rgDispatchDate: z.string().nonempty("O campo 'Data de emissão do RG' é obrigatório"),
  telephone: z.string().nonempty("O campo 'Telefone' é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const RegistrationForm = () => (
  <Formik
    initialValues={{
      municipality: "",
      neighborhood: "",
      number: "",
      road: "",
      state: "",
      birthCity: "",
      birthStatus: "",
      cpf: "",
      dateOfBirth: "",
      email: "",
      fullName: "",
      rgNumber: "",
      rgDispatchStatus: "",
      rgDispatchDate: "",
      telephone: "",
      password: "",
    }}
    validationSchema={toFormikValidationSchema(CadastroSchema)}
    onSubmit={(values) => {
      console.log("Valores do formulário:", values);
    }}
  >
    {({ errors, touched }) => (
      <Form>
        <div>
          <label>Município:</label>
          <Field type="text" name="municipality" />
          {touched.municipality && errors.municipality && <div>{errors.municipality}</div>}
        </div>
        <div>
          <label>Bairro:</label>
          <Field type="text" name="neighborhood" />
          {touched.neighborhood && errors.neighborhood && <div>{errors.neighborhood}</div>}
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
          {touched.birthCity && errors.birthCity && <div>{errors.birthCity}</div>}
        </div>
        <div>
          <label>Estado Civil:</label>
          <Field type="text" name="birthStatus" />
          {touched.birthStatus && errors.birthStatus && <div>{errors.birthStatus}</div>}
        </div>
        <div>
          <label>CPF:</label>
          <Field type="text" name="cpf" />
          {touched.cpf && errors.cpf && <div>{errors.cpf}</div>}
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <Field type="text" name="dateOfBirth" />
          {touched.dateOfBirth && errors.dateOfBirth && <div>{errors.dateOfBirth}</div>}
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
          {touched.rgNumber && errors.rgNumber && <div>{errors.rgNumber}</div>}
        </div>
        <div>
          <label>Status de Emissão do RG:</label>
          <Field type="text" name="rgDispatchStatus" />
          {touched.rgDispatchStatus && errors.rgDispatchStatus && <div>{errors.rgDispatchStatus}</div>}
        </div>
        <div>
          <label>Data de Emissão do RG:</label>
          <Field type="text" name="rgDispatchDate" />
          {touched.rgDispatchDate && errors.rgDispatchDate && <div>{errors.rgDispatchDate}</div>}
        </div>
        <div>
          <label>Telefone:</label>
          <Field type="text" name="telephone" />
          {touched.telephone && errors.telephone && <div>{errors.telephone}</div>}
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
);

export default RegistrationForm;
