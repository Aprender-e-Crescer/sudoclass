import { createFileRoute } from '@tanstack/react-router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { toFormikValidate } from 'zod-formik-adapter'
import { useListSubjectsQuery } from '@/queries/use-list-subjects-query'
import { subjectsSchema } from '@/models/subjects-schema'
import { addDoc, collection, doc } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { useRegisterSchemaQuery } from '@/queries/teachers-listing-query'
import { useListSchoolMatricesQuery } from '@/queries/list-school-matrices'

export const Route = createFileRoute('/list-subjects')({
  component: ListSubjects,
})

function ListSubjects() {
  const { data } = useListSubjectsQuery('aQjvxCKlEuHc9YQEedCQ')
  const { data: schoolMatrices } = useListSchoolMatricesQuery()
  const { data: teachers } = useRegisterSchemaQuery()
  console.log(schoolMatrices)

  const validate = toFormikValidate(subjectsSchema)

  return (
    <>
      <Formik
        initialValues={{ name: '', description: '', teacher: '' }}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          addDoc(collection(firestore, 'schoolMatrices', 'aQjvxCKlEuHc9YQEedCQ', 'subjects'), {
            name: values.name,
            description: values.description,
            teacher: doc(firestore, 'teachers', values.teacher),
          })
          console.log('valores do formulário:', values)
          resetForm()
        }}
      >
        <Form className="flex items-center justify-center flex-col gap-4 p-6">
          {/* <Field as="select" name="teacher" className="bg-gray-200 rounded-md p-2">
            {schoolMatrices?.map((matrice, index) => (
              <option key={index} value={matrice.id}>
                {matrice.name}
              </option>
            ))}
          </Field> */}
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
          <div className="flex flex-col w-full max-w-xs">
            <label htmlFor="teacherId" className="text-gray-700 mb-1">
              Selecione um professor:
            </label>
            <Field as="select" name="teacher" className="bg-gray-200 rounded-md p-2">
              {teachers?.map((teacher, index) => (
                <option key={index} value={teacher.id}>
                  {teacher.fullName}
                </option>
              ))}
            </Field>
          </div>
          <button type="submit" className="mt-4 bg-green-400 text-white rounded-md p-2">
            Enviar
          </button>
        </Form>
      </Formik>

      <div className="mt-6 items-center justify-center flex flex-col gap-y-3">
        <p className="font-bold text-3xl">Matérias já existentes:</p>
        <div className="flex flex-col items-start">
          {data?.map((subject, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-lg font-semibold">{subject.name}</h3>
              <p className="text-gray-600">{subject.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ListSubjects
