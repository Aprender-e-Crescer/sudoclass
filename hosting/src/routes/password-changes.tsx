import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { collection, DocumentReference, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { z } from 'zod'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { InputForm } from '@/components/custom/input-form'

export const Route = createFileRoute('/password-changes')({
  component: ChangedPasswordRequests,
})

const changePasswordRequestSchema = z.object({
  newPasswordDefault: z.string().min(6, { message: 'A string deve conter no minimo 6 caracteres.' }),
  requestStatus: z.enum(['accepted', 'refused', 'pending']),
  studentName: z.instanceof(DocumentReference), // ver sobre
})

type ChangeRequests = z.infer<typeof changePasswordRequestSchema>

const initialValues = {
  newPasswordDefault: '',
  requestStatus: '',
  studentName: '',
}

export function ChangedPasswordRequests() {
  const { data: changeRequests } = useQuery({
    queryKey: ['changed-password-requests'],
    queryFn: async () => {
      const PasswordRequestsRef = collection(firestore, 'studentPasswordChangeRequests').withConverter({
        toFirestore: (doc: ChangeRequests) => doc,
        fromFirestore: (snapshot) => changePasswordRequestSchema.parse(snapshot.data()),
      })
      const docSnap = await getDocs(PasswordRequestsRef)

      return docSnap.docs.map((doc) => doc.data())
    },
  })

  return (
    <>
      <div>
        {changeRequests?.map(({ newPasswordDefault, requestStatus }, index) => (
          <div key={index}>
            <p>
              Nova senha padrão {newPasswordDefault}, status da solicitação: {requestStatus}
            </p>
          </div>
        ))}
      </div>

      <br></br>
      <br></br>

      <h1>Agora envie os dados para validação</h1>
      <Formik
        onSubmit={() => {}}
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(changePasswordRequestSchema)}
      >
        <Form>
          <InputForm
            title="Senha padrão"
            id="newPasswordDefault"
            name="newPasswordDefault"
            placeholder="Digite a senha padrão aqui"
            label="newPasswordDefault"
          />

          <InputForm
            title="Status da requisição"
            id="requestStatus"
            name="requestStatus"
            placeholder="Digite o status da requisição de troca de senha"
            label="requestStatus"
          />
        </Form>
      </Formik>
    </>
  )
}
