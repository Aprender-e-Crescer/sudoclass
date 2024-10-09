import { createFileRoute } from '@tanstack/react-router'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { activitySchema } from '@/models/activity-schema'
import { useSearchActivitiesQuery } from '@/queries/use-search-activities-query'
import { addDoc, collection } from 'firebase/firestore'
import { firestore } from '@/services/firebase' // Assumindo que você já configurou o Firestore


export const Route = createFileRoute('/activities')({
  component: Activities,
})

export function Activities() {
  // Fetch dos dados de atividades
  const { data} = useSearchActivitiesQuery()

  console.log(data)



  return (
    <>
      <div>
        {data?.map(({ name, age }, index) => (
          <div key={index}>
            <p>
              O usuário {name} tem {age} anos
            </p>
          </div>
        ))}
      </div>

      <Formik
        initialValues={{
          name: '',
          age: '',
        }}
        validationSchema={toFormikValidationSchema(activitySchema)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            // Referência à coleção 'activities' no Firestore
            const activitiesRef = collection(firestore, 'activities')

            // Adicionando um novo documento à coleção
            await addDoc(activitiesRef, {
              name: values.name,
              age: Number(values.age), // Certifique-se de converter a idade para número
            })

            alert('Atividade adicionada com sucesso!')
            resetForm() // Reseta o formulário após o envio
          } catch (error) {
            console.error('Erro ao adicionar atividade: ', error)
          } finally {
            setSubmitting(false) // Encerra o estado de "enviando"
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Nome</label>
              <Field
                id="name"
                name="name"
                placeholder="Jorge do Corsa"
                type="text"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="age">Idade</label>
              <Field
                id="age"
                name="age"
                placeholder="30"
                type="number"
              />
              <ErrorMessage name="age" component="div" className="error" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 
                          ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                          text-white`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>

          </Form>
        )}
      </Formik>
    </>
  )
}
