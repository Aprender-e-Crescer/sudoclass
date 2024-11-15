import { Timestamp } from 'firebase/firestore'
import { GenericTable } from '@/components/custom/generic-table'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { getInputSchema } from '@/models/get-input-schema'
import { useListStudentDocumentsQuery } from '@/queries/use-list-student-documents'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { Download, Search } from 'lucide-react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/student-documents')({
  component: StudentDocuments,
})

const columns = [
  { header: 'Documento', accessor: 'name' },
  { header: 'Criado Por', accessor: 'createdby' },
  {
    header: 'Criado Em',
    accessor: 'creationDate',
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

export function StudentDocuments() {
  const { data, isLoading, error } = useListStudentDocumentsQuery()
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

  const formattedData = data.map((item) => ({
    ...item,
    creationDate:
      item.creationDate instanceof Timestamp
        ? new Date(item.creationDate.toDate()).toLocaleDateString()
        : new Date(item.creationDate).toLocaleDateString(),
    createdby: item.createdby.nome || 'Desconhecido',
  }))

  const filteredData = formattedData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4 mx-20 my-10">
      <div>
        <Formik
          initialValues={{ value: '' }}
          validationSchema={toFormikValidationSchema(getInputSchema)}
        >
          {({ setFieldValue }) => (
            <Form className="flex items-start flex-col gap-4">
              <InputWithoutLabel
                name="value"
                icon={<Search />}
                placeholder="Digite aqui..."
                id="value"
                onChange={(e) => {
                  setFieldValue('value', e.target.value),
                    setSearchTerm(e.target.value)
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
