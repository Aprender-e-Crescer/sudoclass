import { createFileRoute } from '@tanstack/react-router'
import { useListStudentDocumentsQuery } from '@/queries/use-list-student-documents'
import { useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { getInputSchema } from '@/models/get-input-schema'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { Download, Search } from 'lucide-react'
import { Form, Formik } from 'formik'
import { GenericTable } from '@/components/custom/generic-table'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'

export const Route = createFileRoute('/_authenticated/documents')({
  component: RouteComponent,
})

const columns = [
  { header: 'Documento', accessor: 'name' },
  { header: 'Criado Por', accessor: 'createdBy' },
  {
    header: 'Criado Em',
    accessor: 'createdDate',
  },
  {
    header: 'Ações',
    Cell: () => (
      <span className="cursor-pointer">
        <Download />
      </span>
    ),
  },
]

function RouteComponent() {
  const { data: user } = useCurrentUserQuery()
  const { data, isLoading, error } = useListStudentDocumentsQuery(user?.uid)
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    )
  }

  if (error) {
    console.error('Error:', error.message)
    return (
      <div>
        <p>Erro ao carregar dados...</p>
      </div>
    )
  }

  const formattedData = data?.map((item) => ({
    ...item,
    createdBy: item.createdBy.name,
    createdDate:
      item.createdDate instanceof Timestamp
        ? new Date(item.createdDate.toDate()).toLocaleDateString()
        : new Date(item.createdDate).toLocaleDateString(),
  }))

  const filteredData = formattedData?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col gap-4 mx-20 my-10">
      <div>
        <Formik initialValues={{ value: '' }} validationSchema={toFormikValidationSchema(getInputSchema)}>
          {({ setFieldValue }) => (
            <Form className="flex items-start flex-col gap-4">
              <InputWithoutLabel
                name="value"
                icon={<Search />}
                placeholder="Digite aqui..."
                id="value"
                onChange={(e) => {
                  setFieldValue('value', e.target.value), setSearchTerm(e.target.value)
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h1 className="font-bold text-blue-950 text-4xl">Documentos</h1>
      </div>
      <GenericTable data={filteredData} columns={columns} />
    </div>
  )
}
