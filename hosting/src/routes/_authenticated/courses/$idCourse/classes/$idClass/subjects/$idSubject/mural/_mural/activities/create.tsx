import { InputFile } from '@/components/custom/form/input-file'
import { Activity } from '@/models/activity-schema'
import { useCreateActivityMutation } from '@/mutations/use-create-activity-mutation'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { useNavigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { ClipboardList } from 'lucide-react'
import { FormBody } from '@/components/custom/form/body'
import { Input } from '@/components/custom/form/input'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/create',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { idCourse, idClass, idSubject } = Route.useParams()
  const { mutate } = useCreateActivityMutation()

  const initialValues: Activity = {
    id: '',
    title: '',
    description: '',
    deliveryDate: new Date(),
    postingDate: new Date(),
    attachments: [],
    isAcceptingSubmits: true,
  }

  async function handleSubmit(values: Activity) {
    const deliveryDate = new Date(values.deliveryDate)

    mutate(
      {
        title: values.title,
        description: values.description,
        deliveryDate,
        idCourse,
        idClass,
        idSubject,
        attachments: values.attachments, 
      },
      {
        onSuccess: () => {
          navigate({
            to: '/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities',
            params: { idCourse, idClass, idSubject },
          })
        },
      },
    )
  }

  return (
    <div className="flex w-full h-full">
      <div className="w-full h-16">
        <div className="flex border mx-4 my-4 p-5 rounded-xl items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-yellow-400 h-10 w-10 rounded-full flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-gray-700" color="white" />
            </AvatarFallback>
          </Avatar>
          Atividade
        </div>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <FormBody cancelTo="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities">
            <Input name="title" label="Título" type="text" placeholder="Digite o título" />
            <Input name="description" label="Instruções" type="text" placeholder="Digite as instruções" />
            <Input name="deliveryDate" label="Data de entrega" type="date" placeholder="Data de entrega" />
            <InputFile name="attachments" label="Anexar documentos" type="file" multiple />
          </FormBody>
        </Formik>
      </div>
    </div>
  )
}
