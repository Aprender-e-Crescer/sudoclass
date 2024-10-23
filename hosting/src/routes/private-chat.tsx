import { createFileRoute } from '@tanstack/react-router'
import ListStudents from '@/components/custom/list-students'
import { Images, Paperclip, Search, SendHorizontal, Smile } from 'lucide-react'
import { useState } from 'react'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { getInputSchema } from '@/models/get-input-schema'

export const Route = createFileRoute('/private-chat')({
  component: PrivateChat,
})

const initialValues = {
  ProcurarDocumentos: '',
}

const StudentsData = [
  { name: 'João', picture: '', variant: undefined },
  { name: 'Maria', picture: 'https://example.com/maria.jpg', variant: undefined },
  { name: 'Pedro', picture: 'https://example.com/pedro.jpg', variant: undefined },
  { name: 'Ana', picture: 'https://example.com/ana.jpg', variant: undefined },
  { name: 'Lucas', picture: 'https://example.com/lucas.jpg', variant: undefined },
  { name: 'Rafael', picture: 'https://example.com/rafael.jpg', variant: undefined },
  { name: 'Isabella', picture: 'https://example.com/isabella.jpg', variant: undefined },
]

export function PrivateChat() {
  const [selectedStudent, setSelectedStudent] = useState({})

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="flex flex-col w-full lg:w-3/12">
        {StudentsData.map((student, index) => (
          <div key={index} onClick={() => setSelectedStudent(student)}>
            <ListStudents name={student.name} picture={student.picture} variant={student.variant} />
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between w-full lg:w-2/3 mt-4 lg:mt-0">
        <div className="flex items-center mt-4">
          <img src={selectedStudent.picture} className="w-16 h-16 rounded-full mr-2" />
          <span className="text-lg">{selectedStudent.name || 'Nome não disponível'}</span>
        </div>

        <div>
          <div className="flex flex-col gap-5 ">
            <Formik
              onSubmit={() => {}}
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(getInputSchema)}
            >
              <Form>
                <InputWithoutLabel
                  name="value"
                  icon={<SendHorizontal className="text-[#787486]" />}
                  placeholder="Digite aqui..."
                  id="value"
                />
              </Form>
            </Formik>
            <div className="text-[#787486] flex gap-4">
              <Images /> <Paperclip /> <Smile />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
