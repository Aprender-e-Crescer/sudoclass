import { createFileRoute } from '@tanstack/react-router'
import { Eye, Loader2, Search } from 'lucide-react'
import { SetStateAction, useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { getInputSchema } from '@/models/get-input-schema'
import { Field, Form, Formik } from 'formik'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { GenericTable } from '@/components/custom/generic-table'
import { ListFormsQuery } from '@/queries/use-list-forms-query'
import { ListForm } from '@/models/list-forms-schema'

export const Route = createFileRoute('/_authenticated/forms')({
  component: RouteComponent,
})

const initialValues = {
  value: '',
}

const columns = [
  { header: 'Formulario', accessor: 'name' },
  {
    header: 'Criado Em',
    accessor: 'createdDate',
    Cell: (row: any) => {
      const date = new Date(row.createdDate)
      return date.toLocaleDateString('pt-BR')
    },
  },
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
  const { data, isLoading, error } = ListFormsQuery()
  const [searchValue, setSearchValue] = useState('')

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    )
  }

  if (error) {
    return error.message
  }

  const filteredData =
    data?.filter((form: ListForm) => form.name?.toLowerCase().includes(searchValue.toLowerCase())) || []

  return (
    <div className="flex flex-col gap-4 mx-20 my-10">
      <>
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
      </>
    </div>
  )
}
