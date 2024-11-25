import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { getInputSchema } from '@/models/get-input-schema'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { Download, Search } from 'lucide-react'
import { Form, Formik } from 'formik'
import { GenericTable } from '@/components/custom/generic-table'

export const Route = createFileRoute('/_authenticated/documents')({
  component: RouteComponent,
})

const data = [
  {
    id: '1',
    name: 'Declaração de Matrícula',
    createdBy: { id: '101', name: 'João Silva' },
    createdDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Histórico Escolar',
    createdBy: { id: '102', name: 'Maria Oliveira' },
    createdDate: new Date('2023-12-10'),
  },
  {
    id: '3',
    name: 'Certificado de Conclusão',
    createdBy: { id: '103', name: 'Carlos Santos' },
    createdDate: new Date('2024-02-05'),
  },
  {
    id: '4',
    name: 'Boletim',
    createdBy: { id: '104', name: 'Ana Souza' },
    createdDate: new Date('2023-11-20'),
  },
  {
    id: '5',
    name: 'Comprovante de Pagamento',
    createdBy: { id: '105', name: 'Pedro Alves' },
    createdDate: new Date('2023-10-25'),
  },
]

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
  // const { data: user } = useCurrentUserQuery()
  // const { data, isLoading, error } = useListStudentDocumentsQuery(user?.uid)
  const [searchTerm, setSearchTerm] = useState('')

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
