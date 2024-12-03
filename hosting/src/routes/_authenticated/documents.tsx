import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { getInputSchema } from '@/models/get-input-schema'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { Download, Loader2, Search } from 'lucide-react'
import { Form, Formik } from 'formik'
import { GenericTable } from '@/components/custom/generic-table'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'
import { useListStudentDocumentsQuery } from '@/queries/use-list-student-documents'

export const Route = createFileRoute('/_authenticated/documents')({
  component: RouteComponent,
})

function downloadDocument(url: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = url.split('/').pop() || 'document'
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function RouteComponent() {
  const currentUser = useCurrentUserQuery()
  const { data: userData } = useGetUserQuery(currentUser?.data?.uid)
  const { data, isLoading, error } = useListStudentDocumentsQuery(userData?.idStudent)

  const columns = [
    { header: 'Documento', accessor: 'nome' },
    {
      header: 'Ações',
      accessor: 'url',
      Cell: (row: any) => {
        const documentUrl = row.url

        console.log(documentUrl)
        return (
          <span
            className="cursor-pointer"
            onClick={() => {
              if (documentUrl) {
                downloadDocument(documentUrl)
              } else {
                alert('Documento não disponível')
              }
            }}
          >
            <Download />
          </span>
        )
      },
    },
  ]

  const [searchTerm, setSearchTerm] = useState('')

  const formattedData = data ? data.map((item) => ({ ...item })) : []

  const filteredData = formattedData.filter((item) => item.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500 text-center">Erro ao carregar os dados.</p>
  }

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
                  setFieldValue('value', e.target.value)
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
