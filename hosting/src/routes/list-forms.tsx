import { GenericTable } from '@/components/custom/generic-table'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { getInputSchema } from '@/models/get-input'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { Eye, Search } from 'lucide-react'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const Route = createFileRoute('/list-forms')({
  component: ListForms,
})

const initialValues = {
  value: '',
}

const columns = [
  { header: 'Formulario', accessor: 'name' },
  { header: 'Criado Por', accessor: 'createdBy' },
  { header: 'Criado Em', accessor: 'createdIn' },
  {
    header: 'Ações',
    Cell: () => (
      <span className="cursor-pointer">
        <Eye />
      </span>
    ),
  },
]

const data = [
  {
    name: 'Questionario de conclusão de curso',
    createdBy: 'Samara',
    createdIn: '10/10/2010',
  },
  {
    name: 'Questionario de Interesses',
    createdBy: 'Vaggou',
    createdIn: '01/05/2015',
  },
]

export function ListForms() {
  return (
    <div className="flex flex-col gap-4 mx-20 my-10">
      <div>
        <Formik
          onSubmit={() => {}}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(getInputSchema)}
        >
          <Form>
            <InputWithoutLabel name="value" icon={<Search />} placeholder="Procurar Formularios" id="value" />
          </Form>
        </Formik>
      </div>
      <div>
        <h1 className="font-bold text-blue-950 text-4xl">Formulários Disponiveis</h1>
      </div>
      <GenericTable data={data} columns={columns} />
    </div>
  )
}
