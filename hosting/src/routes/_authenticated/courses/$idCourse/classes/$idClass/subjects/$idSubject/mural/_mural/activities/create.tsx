import { Activity } from '@/models/activity-schema'
import { useCreateActivityMutation } from '@/mutations/use-create-activity-mutation'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Link, useNavigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { Field, Form, Formik } from 'formik'
import { ClipboardList } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/create',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { idCourse, idClass, idSubject } = Route.useParams()
  const { mutate, isPending } = useCreateActivityMutation()

  const [attachments, setAttachments] = useState<string[]>([])
  const [attachmentInput, setAttachmentInput] = useState('')

  const handleAddAttachment = () => {
    if (attachmentInput) {
      setAttachments([...attachments, attachmentInput])
      setAttachmentInput('')
    }
  }

  const handleRemoveAttachment = (index: number) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index)
    setAttachments(updatedAttachments)
  }

  const initialValues: Activity = {
    id: '',
    title: '',
    description: '',
    deliveryDate: new Date(),
    postingDate: new Date(),
    attachments,
    isAcceptingSubmits: true,
  }

  async function handleSubmit(values: Activity) {
    mutate(
      {
        title: values.title,
        description: values.description,
        deliveryDate: new Date(values.deliveryDate),
        idCourse,
        idClass,
        idSubject,
        attachments,
      },
      {
        onSuccess: () => {
          navigate({
            to: `/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities`,
            params: {
              idCourse,
              idClass,
              idSubject,
            },
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
          <Form className="flex mx-4 my-4 p-5 rounded-xl">
            <div className="flex flex-col border p-3 rounded-lg w-3/4">
              <div>
                <label className="block text-sm font-medium">Título</label>
                <Field type="text" name="title" placeholder="Digite o título" className="w-full p-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium">Instruções</label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Digite as instruções"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Anexos</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={attachmentInput}
                    onChange={(e) => setAttachmentInput(e.target.value)}
                    placeholder="Digite a URL do anexo"
                    className="w-full p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddAttachment()}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Adicionar anexo
                  </button>
                  <div className="mt-2">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span>{attachment}</span>
                        <button type="button" onClick={() => handleRemoveAttachment(index)} className="text-red-500">
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-1/4 border mx-4 p-5 gap-2 rounded-lg">
              <label className="block text-sm font-medium">Data de entrega</label>
              <Field type="date" name="deliveryDate" className="rounded-xl bg-gray-200 p-1" />

              <div className="flex flex-col gap-2 justify-center">
                <Link
                  to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities"
                  params={{ idCourse, idClass, idSubject }}
                >
                  <button type="reset" className="mt-4 flex-1 rounded-md bg-gray-300 text-gray-700 p-2 w-full">
                    Cancelar
                  </button>
                </Link>

                <button type="submit" disabled={isPending} className="flex-1 bg-blue-500 text-white p-2 rounded">
                  {isPending ? 'Criando...' : 'Criar atividade'}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
