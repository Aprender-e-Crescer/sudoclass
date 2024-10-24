import { createFileRoute } from '@tanstack/react-router'
import ListStudents from '@/components/custom/list-students'
import { Images, Paperclip, SendHorizontal, Smile, ArrowLeft } from 'lucide-react'
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
  { name: 'João', picture: '', variant: undefined },
  { name: 'Maria', picture: 'https://example.com/maria.jpg', variant: undefined },
  { name: 'Pedro', picture: 'https://example.com/pedro.jpg', variant: undefined },
  { name: 'Ana', picture: 'https://example.com/ana.jpg', variant: undefined },
]

export function PrivateChat() {
  const [selectedStudent, setSelectedStudent] = useState(null)

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
  }

  const handleBack = () => {
    setSelectedStudent(null)
  }

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 h-screen">
      <div className={`flex-col ${selectedStudent ? 'hidden lg:flex h-full' : 'flex'}`}>
        {StudentsData.map((student, index) => (
          <div key={index} onClick={() => handleStudentSelect(student)}>
            <ListStudents name={student.name} picture={student.picture} variant={student.variant} />
          </div>
        ))}
      </div>

      <div
        className={`flex flex-col w-full h-full justify-evenly lg:w-2/3 mt-4 lg:mt-0 ${selectedStudent ? 'block' : 'hidden'}`}
      >
        <div className="flex items-center mt-4">
          <button onClick={handleBack} className="mr-2">
            <ArrowLeft />
          </button>
          {selectedStudent && (
            <>
              <img src={selectedStudent.picture} className="w-16 h-16 rounded-full mr-2" />
              <span>{selectedStudent.name}</span>
            </>
          )}
        </div>

        <div className="flex-grow overflow-auto">{}</div>

        <div>
          <div className="text-[#787486] flex flex-col gap-4">
            <div className="flex gap-4">
              <Images /> <Paperclip /> <Smile />
            </div>
            <Formik
              onSubmit={() => {}}
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(getInputSchema)}
            >
              <Form className="flex items-start flex-col gap-4">
                <InputWithoutLabel
                  name="value"
                  icon={<SendHorizontal className="text-[#787486]" />}
                  placeholder="Digite aqui..."
                  id="value"
                  className="flex-grow"
                />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
