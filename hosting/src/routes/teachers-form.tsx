// teachers-form.tsx
import React from 'react'
import { InputForm } from '@/components/custom/generics-inputs'
import { createFileRoute } from '@tanstack/react-router'
import { Formik, Form } from 'formik'

// Componente SimpleForm
export function SimpleForm() {
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Cadastro</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('Valores do formulário:', values)
        }}
      >
        {({ getFieldProps, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputForm
              label="Nome completo"
              placeholder="Digite seu nome completo"
              id="fullName"
              type="text"
              {...getFieldProps('fullName')}
            />

            <InputForm
              label="E-mail"
              placeholder="Digite seu e-mail"
              id="email"
              type="text"
              {...getFieldProps('email')}
            />

            <button type="submit" className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg">
              Cadastrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

// Rota configurada para o SimpleForm
export const Route = createFileRoute({
  component: SimpleForm,
})
