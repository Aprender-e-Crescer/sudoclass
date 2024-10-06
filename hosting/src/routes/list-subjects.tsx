import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { collection, getDocs } from 'firebase/firestore'
import { z } from 'zod'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { toFormikValidate } from 'zod-formik-adapter'

export const Route = createFileRoute('/list-subjects')({
  component: ListSubjects,
})

const subjectsSchema = z.object({
  name: z.string().min(2, { message: 'O nome da matéria não pode ser inferior que 2 letras' }),
  description: z.string().min(2, { message: 'A descrição da matéria não pode ser inferior que 2 letras' }),
})

type Subject = z.infer<typeof subjectsSchema>

function ListSubjects() {
  const { data } = useQuery({
    queryKey: ['getSubjects'],
    queryFn: async () => {
      const subjectRefs = collection(firestore, 'schoolMatrices', 'aQjvxCKlEuHc9YQEedCQ', 'subjects').withConverter({
        toFirestore: (subject: Subject) => subject,
        fromFirestore: (snapshot) => subjectsSchema.parse(snapshot.data()),
      })

      const snapshot = await getDocs(subjectRefs)
      return snapshot.docs.map((doc) => doc.data())
    },
  })

  console.log(data)

  const validate = toFormikValidate(subjectsSchema)

  return (
    <Formik
      initialValues={{ name: '', description: '' }}
      validate={validate}
      onSubmit={(values, { resetForm }) => {
        console.log('valores do formulário:', values)
        resetForm()
      }}
    >
      <Form className="flex items-center justify-center flex-col gap-4 p-6">
        <div className="flex flex-col w-full max-w-xs">
          <Field type="text" className="bg-gray-200 rounded-md p-2" placeholder="Nome da matéria" name="name" />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <Field
            type="text"
            className="bg-gray-200 rounded-md p-2"
            placeholder="Descrição da matéria"
            name="description"
          />
          <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <button type="submit" className="mt-4 bg-green-400 text-white rounded-md p-2">
          Enviar
        </button>
      </Form>
    </Formik>
  )
}

export default ListSubjects
