import { CustomLoading } from '@/components/custom/custom-loading'
import { Activity } from '@/models/activity-schema'
import { useUpdateActivityMutation } from '@/mutations/use-update-activity-mutation'
import { getActivityByIdFirestoreQuery, getActivityByIdQueryOptions } from '@/queries/use-get-activity-by-id'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { Field, Form, Formik } from 'formik'
import { ClipboardList, SquareArrowOutUpRight, Trash } from 'lucide-react'
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import * as Switch from '@radix-ui/react-switch'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/$idActivity/update-activity',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { idClass, idCourse, idSubject, idActivity } = Route.useParams()

  const activityByIdQueryOptions = getActivityByIdQueryOptions(idCourse, idClass, idSubject, idActivity)
  useFirestoreRealtimeQuery(
    activityByIdQueryOptions.queryKey,
    getActivityByIdFirestoreQuery(idCourse, idClass, idSubject, idActivity),
  )

  const { data: dataActivity, isLoading } = useSuspenseQuery(activityByIdQueryOptions)

  const { mutate: mutateActivity, isPending } = useUpdateActivityMutation()

  const [attachments, setAttachments] = useState<string[]>(dataActivity.attachments || [])
  const [attachmentInput, setAttachmentInput] = useState('')

  const handleAddAttachment = (setFieldValue: (field: string, value: any) => void) => {
    if (attachmentInput) {
      const newAttachments = [...attachments, attachmentInput]
      setAttachments(newAttachments)
      setFieldValue('attachments', newAttachments)
      setAttachmentInput('')
    }
  }

  const handleRemoveAttachment = (index: number, setFieldValue: (field: string, value: any) => void) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index)
    setAttachments(updatedAttachments)
    setFieldValue('attachments', updatedAttachments)
  }

  const initialValues: Activity = {
    id: dataActivity.id,
    title: dataActivity.title,
    description: dataActivity.description,
    deliveryDate: dataActivity.deliveryDate,
    postingDate: dataActivity.postingDate,
    attachments: dataActivity.attachments,
    isAcceptingSubmits: dataActivity.isAcceptingSubmits,
  }

  if (isLoading || !initialValues) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CustomLoading message="Carregando atividade..." size={70} />
      </div>
    )
  }

  async function handleSubmit(values: Activity) {
    mutateActivity(
      {
        idCourse,
        idClass,
        idSubject,
        idActivity,
        title: values.title,
        description: values.description,
        deliveryDate: values.deliveryDate,
        isAcceptingSubmits: values.isAcceptingSubmits,
        attachments: values.attachments,
      },
      {
        onSuccess: () => {
          navigate({
            to: '/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities',
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
    <>
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

          <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
            {({ values, setFieldValue }) => (
              <Form className="flex mx-4 my-4 p-5 rounded-xl">
                <div className="flex flex-col border p-3 rounded-lg w-3/4">
                  <div>
                    <label className="block text-sm font-medium">Título</label>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Digite o título"
                      className="w-full p-2 border rounded"
                    />
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
                        onClick={() => handleAddAttachment(setFieldValue)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Adicionar anexo
                      </button>
                      <div className="mt-2">
                        {attachments.map((attachment, index) => (
                          <div className="border p-2 rounded-lg flex gap-2 justify-between" key={attachment}>
                            <a href={attachment} target="_blank" rel="noopener noreferrer">
                              <SquareArrowOutUpRight className="text-gray-600" />
                            </a>
                            <p className="text-gray-600">{attachment}</p>
                            <button
                              type="button"
                              onClick={() => handleRemoveAttachment(index, setFieldValue)}
                              className="text-red-500"
                            >
                              <Trash />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <label className="block text-sm font-medium">Aceita envios?</label>
                    <Field name="isAcceptingSubmits">
                      {({ field, form }: { field: any; form: any }) => (
                        <Switch.Root
                          checked={field.value}
                          onCheckedChange={(value) => form.setFieldValue(field.name, value)}
                          className="bg-gray-300 w-10 h-6 rounded-full relative data-[state=checked]:bg-blue-500"
                        >
                          <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform translate-x-1 data-[state=checked]:translate-x-5" />
                        </Switch.Root>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="flex flex-col w-1/4 border mx-4 p-5 gap-2 rounded-lg">
                  <label className="block text-sm font-medium">Data de entrega</label>
                  <Field
                    type="date"
                    name="deliveryDate"
                    className="rounded-xl bg-gray-200 p-1"
                    value={values.deliveryDate ? new Date(values.deliveryDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setFieldValue('deliveryDate', new Date(e.target.value))}
                  />

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
                      {isPending ? 'Atualizando...' : 'Atualizar'}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
