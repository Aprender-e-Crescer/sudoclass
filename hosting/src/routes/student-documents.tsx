import { TableStudentDocuments } from '@/components/custom/table-student-documents'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { getInputSchema } from '@/models/get-input'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { Search } from 'lucide-react'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const Route = createFileRoute('/student-documents')({
  component: StudentDocuments,
})

const initialValues = {
  ProcurarDocumentos: '',
}

export function StudentDocuments() {
  return (
    <div>
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
      <TableStudentDocuments />
    </div>
  )
}
