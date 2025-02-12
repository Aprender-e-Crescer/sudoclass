import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getActivityByIdFirestoreQuery, getActivityByIdQueryOptions } from '@/queries/use-get-activity-by-id'
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import NoteValue from '@/components/custom/note-value'
import { ArrowLeft, ClipboardList, SquareArrowOutUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/$idActivity/view-activity-student',
)({ component: ViewActivityStudent })

export function ViewActivityStudent() {
  const { idCourse, idClass, idSubject, idActivity } = Route.useParams()

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

      <div className="flex flex-col w-full overflow-hidden">
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
        <div className="flex w-full">
          <div className="flex w-3/4 px-4">
            <div className="flex flex-col gap-3 w-full">
              <h1 className="text-gray-600 font-semibold text-2xl mt-2">Instruções:</h1>
              <p className="text-gray-500 text-sm">{dataActivity?.description}</p>
              <h1 className="text-gray-600 font-semibold text-2xl mt-9">Anexos do Professor:</h1>
              {dataActivity?.attachments && dataActivity.attachments.length > 0 ? (
                dataActivity.attachments.map((attachment) => (
                  <div className="border p-2 rounded-lg flex gap-2" key={attachment}>
                    <SquareArrowOutUpRight className="text-gray-600" />
                    <a href={attachment} target="_blank" rel="noopener noreferrer">
                      <p className="text-gray-600">{attachment}</p>
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Nenhum anexo disponível.</p>
              )}
            </div>
          </div>

          <div className="flex w-1/4 border flex-col p-2 rounded-lg mr-4">
            <h1 className="text-gray-600 font-semibold text-2xl mt-9">Seus Anexos</h1>
            <div className="flex flex-col gap-5 mt-5">
              <Button variant="blueButton" className="w-full">
                Adicionar ou criar
              </Button>
              <Button variant="blueButton" className="w-full">
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
