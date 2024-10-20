import { GenericTable } from '@/components/custom/generic-table'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { getInputSchema } from '@/models/get-input=shcema'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { Download, Search } from 'lucide-react'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const Route = createFileRoute('/student-documents')({
  component: StudentDocuments,
})

const initialValues = {
  value: '',
}

const columns = [
  { header: 'Documento', accessor: 'name' },
  { header: 'Criado Por', accessor: 'createdBy' },
  { header: 'Criado Em', accessor: 'createdIn' },
  {
    header: 'Ações',
    Cell: () => (
      <span className="cursor-pointer">
        <Download />
      </span>
    ),
  },
]

const data = [
  {
    name: 'Certidao Nascimento',
    createdBy: 'Samara',
    createdIn: '10/10/2010',
  },
  {
    name: 'RG',
    createdBy: 'Samara',
    createdIn: '01/05/2015',
  },
]

export function StudentDocuments() {
  return (
    <div className="flex flex-col gap-4 mx-20 my-10">
      <div>
        <Formik
          onSubmit={() => {}}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(getInputSchema)}
        >
          <Form>
            <InputWithoutLabel name="value" icon={<Search />} placeholder="Procurar Documentos" id="value" />
          </Form>
        </Formik>
      </div>
      <div>
        <h1 className="font-bold text-blue-950 text-4xl">Documentos</h1>
      </div>
      <GenericTable data={data} columns={columns} />
    </div>
  )
}
