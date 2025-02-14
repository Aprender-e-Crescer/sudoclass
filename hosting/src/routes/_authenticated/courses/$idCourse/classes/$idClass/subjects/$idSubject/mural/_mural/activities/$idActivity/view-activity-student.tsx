import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getActivityByIdFirestoreQuery, getActivityByIdQueryOptions } from '@/queries/use-get-activity-by-id'
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import NoteValue from '@/components/custom/note-value'
import { ArrowLeft, ClipboardList, FileText, File, FolderArchive } from 'lucide-react'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Link } from '@tanstack/react-router'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { InputFile } from '@/components/custom/form/input-file'
import { FormBody } from '@/components/custom/form/body'
import { Formik } from 'formik'
import { useCreateSubmitMutation } from '@/mutations/use-create-submit-mutation'
import { useGetFullUser } from '@/hooks/use-get-full-user'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/$idActivity/view-activity-student',
)({ component: ViewActivityStudent })

const getFileType = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension!)) {
    return 'image'
  } else if (extension === 'pdf') {
    return 'pdf'
  } else if (extension === 'zip') {
    return 'zip'
  }
  return 'other'
}

export function ViewActivityStudent() {
  const { idCourse, idClass, idSubject, idActivity } = Route.useParams()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { mutate } = useCreateSubmitMutation()
  const fullUser = useGetFullUser()

  const initialValues = {
    studentAttachments: [],
  }

  async function handleSubmit(values: typeof initialValues) {
    console.log('Dados enviados para mutate:', {
      idCourse,
      idClass,
      idSubject,
      idActivity,
      studentProfile: fullUser.profileRef,
      studentAttachments: values.studentAttachments,
    });
  
    mutate({
      idCourse,
      idClass,
      idSubject,
      idActivity,
      studentProfile: fullUser.profileRef,
      studentAttachments: values.studentAttachments,
    });
  }

  const activityByIdQueryOptions = getActivityByIdQueryOptions(idCourse, idClass, idSubject, idActivity)
  useFirestoreRealtimeQuery(
    activityByIdQueryOptions.queryKey,
    getActivityByIdFirestoreQuery(idCourse, idClass, idSubject, idActivity),
  )

  const { data: dataActivity, isLoading } = useSuspenseQuery(activityByIdQueryOptions)

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Link
        to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities"
        params={{
          idCourse,
          idClass,
          idSubject,
        }}
      >
        <ArrowLeft className="mt-4 ml-4 text-gray-400" />
      </Link>

      <div className="flex flex-col w-full">
        <div className="flex border mx-4 my-4 p-5 rounded-xl items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-yellow-400 h-10 w-10 rounded-full flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-gray-700" color="white" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start">
            <h1 className="text-lg font-semibold">{dataActivity?.title}</h1>
            <p className="text-gray-500 text-sm">
              Data para entrega:{' '}
              {dataActivity?.deliveryDate ? new Date(dataActivity.deliveryDate).toLocaleDateString() : 'Sem data'}
            </p>
            <NoteValue note={0} maxGrade={100} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full px-4">
          <div className="flex flex-col gap-3 w-full md:w-3/4">
            <h1 className="text-gray-600 font-semibold text-2xl mt-2">Instruções:</h1>
            <p className="text-gray-500 text-sm">{dataActivity?.description}</p>
            <h1 className="text-gray-600 font-semibold text-2xl mt-9">Anexos do Professor:</h1>
            {dataActivity?.attachments?.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {dataActivity.attachments.map((attachment, index) => {
                  const fileUrl = URL.createObjectURL(attachment)
                  const fileType = getFileType(attachment.name)

                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-300 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col w-40 h-40" // Tamanho fixo
                    >
                      {fileType === 'image' ? (
                        <a onClick={() => setSelectedImage(fileUrl)} className="flex-1">
                          <img src={fileUrl} alt={`Anexo ${index + 1}`} className="w-full h-full object-cover" />
                        </a>
                      ) : fileType === 'pdf' ? (
                        <a
                          href={fileUrl}
                          download={attachment.name}
                          className="flex-1 flex items-center justify-center bg-gray-100"
                        >
                          <FileText className="h-12 w-12 text-gray-500" />
                        </a>
                      ) : fileType === 'zip' ? (
                        <a
                          href={fileUrl}
                          download={attachment.name}
                          className="flex-1 flex items-center justify-center bg-gray-100"
                        >
                          <FolderArchive className="h-12 w-12 text-gray-500" />
                        </a>
                      ) : (
                        <a
                          href={fileUrl}
                          download={attachment.name}
                          className="flex-1 flex items-center justify-center bg-gray-100"
                        >
                          <File className="h-12 w-12 text-gray-500" />
                        </a>
                      )}

                      <div className="p-2 bg-gray-50 border-t border-gray-200">
                        <p className="text-xs text-gray-600">
                          Anexo {index + 1} ({fileType})
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Nenhum anexo disponível.</p>
            )}
          </div>

          <div className="border flex flex-col gap-3 w-full md:w-1/4 mt-8 md:mt-0 md:pl-8">
            <h1 className="text-gray-600 font-semibold text-2xl">Seus Anexos</h1>
            <div className="flex flex-col gap-5 mt-5">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <FormBody
                  buttonsNextTo={true}
                  cancelTo="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities"
                >
                  <InputFile name="studentAttachments" label="Anexar documentos" type="file" multiple />
                </FormBody>
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Visualizar Anexo</DialogTitle>
          </DialogHeader>
          {selectedImage && <img src={selectedImage} alt="Anexo selecionado" className="w-full h-auto rounded-lg" />}
        </DialogContent>
      </Dialog>
    </>
  )
}
