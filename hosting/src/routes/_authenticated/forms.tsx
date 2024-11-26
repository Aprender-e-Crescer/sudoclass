import { createFileRoute } from '@tanstack/react-router'
import { Eye, Search } from 'lucide-react'
import { SetStateAction, useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { getInputSchema } from '@/models/get-input-schema'
import { Field, Form, Formik } from 'formik'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { GenericTable } from '@/components/custom/generic-table'

export const Route = createFileRoute('/_authenticated/forms')({
  component: RouteComponent,
})

const initialValues = {
  value: '',
}

const data = [
  {
    id: '1',
    name: 'Formulário de Feedback',
    createdDate: new Date('2024-01-15').toLocaleDateString(),
    createdBy: 'João Silva',
    link: 'https://docs.google.com/forms/d/1TeRTPqDRfntItYLU-2ihMaXOq0GMGgrwRZ46oP_6rww/edit',
  },
  {
    id: '2',
    name: 'Avaliação Semestral',
    createdDate: new Date('2024-02-10').toLocaleDateString(),
    createdBy: 'Maria Oliveira',
    link: 'https://docs.google.com/forms/d/1C5iXVr6GwhcZZp45sv5HhPdx3P3Hex3kFDOOV7dRBSA/edit',
  },
  {
    id: '3',
    name: 'Inscrição para Eventos',
    createdDate: new Date('2024-01-20').toLocaleDateString(),
    createdBy: 'Carlos Santos',
    link: 'https://docs.google.com/forms/d/1C5iXVr6GwhcZZp45sv5HhPdx3P3Hex3kFDOOV7dRBSA/edit',
  },
  {
    id: '4',
    name: 'Pesquisa de Satisfação',
    createdDate: new Date('2023-12-30').toLocaleDateString(),
    createdBy: 'Ana Souza',
    link: 'https://docs.google.com/forms/d/1TeRTPqDRfntItYLU-2ihMaXOq0GMGgrwRZ46oP_6rww/edit',
  },
  {
    id: '5',
    name: 'Formulário de Solicitação',
    createdDate: new Date('2024-02-05').toLocaleDateString(),
    createdBy: 'Pedro Alves',
    link: 'https://docs.google.com/forms/d/1C0EyX0esG-jxuONeJX4EHMf7b7DnyLzrouaYlhGsCxw/edit',
  },
]

const columns = [
  { header: 'Formulario', accessor: 'name' },
  { header: 'Criado Em', accessor: 'createdDate' },
  { header: 'Criado Por', accessor: 'createdBy' },
  {
    header: 'Ações',
    Cell: (row: any) => (
      <a href={row.link} className="underline cursor-pointer flex items-center gap-1">
        <Eye />
      </a>
    ),
  },
]

function RouteComponent() {
  // const { data, isLoading, error } = ListFormsQuery()

  const [searchValue, setSearchValue] = useState('')

  const filteredData =
    data?.filter((form: { name: string; createdDate: string; createdBy: string }) =>
      form.name?.toLowerCase().includes(searchValue.toLowerCase()),
    ) || []

  return (
    <div className="flex flex-col gap-4 mx-20 my-10">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(getInputSchema)}
          onSubmit={(values) => {
            setSearchValue(values.value)
          }}
        >
          {({ handleChange }) => (
            <Form>
              <Field
                name="value"
                as={InputWithoutLabel}
                icon={<Search />}
                placeholder="Procurar Formularios"
                id="value"
                onChange={(e: { target: { value: SetStateAction<string> } }) => {
                  handleChange(e)
                  setSearchValue(e.target.value)
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h1 className="font-bold text-blue-950 text-4xl">Formulários Disponíveis</h1>
      </div>
      <GenericTable data={filteredData} columns={columns} />
    </div>
  )
}
