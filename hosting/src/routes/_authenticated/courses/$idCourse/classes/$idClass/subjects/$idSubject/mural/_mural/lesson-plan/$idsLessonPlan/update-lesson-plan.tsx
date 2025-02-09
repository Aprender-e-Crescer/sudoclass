import { getLessonPlanByIdQueryOptions } from '@/queries/use-get-lesson-plan-by-id'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idsLessonPlan/update-lesson-plan',
)( {
  component: UpdateLessonPlan,
})

function UpdateLessonPlan() {
  const { idCourse, idClass, idSubject, idsLessonPlan } = Route.useParams()

  const {
    data: lessonPlan,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['lessonPlan', idCourse, idClass, idSubject, idsLessonPlan],
    queryFn: getLessonPlanByIdQueryOptions(idCourse, idClass, idSubject, idsLessonPlan),
  })

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error?.message}</p>
  }

  const parsedStartDate = lessonPlan?.startDate instanceof Timestamp
    ? lessonPlan.startDate.toDate()
    : lessonPlan?.startDate

  const parsedEndDate = lessonPlan?.endDate instanceof Timestamp
    ? lessonPlan.endDate.toDate()
    : lessonPlan?.endDate

  const formattedStartDate = parsedStartDate && !isNaN(parsedStartDate.getTime())
    ? format(parsedStartDate, 'dd/MM/yyyy')
    : 'Invalid date'

  const formattedStartDateInicio = parsedStartDate && !isNaN(parsedStartDate.getTime())
    ? format(parsedStartDate, 'HH:mm')
    : 'Invalid date'

  const formattedEndDate = parsedEndDate && !isNaN(parsedEndDate.getTime())
    ? format(parsedEndDate, 'HH:mm')
    : 'Invalid date'

  return (
    <>
      <div className="border p-4 mx-4 my-4 rounded-md flex flex-col justify-center items-center">
        <div className='flex w-full justify-around border-b mb-4 items-center'>
          <p>Data: {formattedStartDate}</p>
          <p>Início: {formattedStartDateInicio}</p>
          <p>Fim: {formattedEndDate}</p>
        </div>

        <div className="w-full  flex flex-col gap-2">
          <p>Conteúdo formativo</p>
          <input type="text" className="border rounded-md p-2" placeholder={lessonPlan?.teachingDetails.content} />
        </div>

        <div className="w-full  flex flex-col gap-2">
          <p>Modo de ensino</p>
          <input type="text" className="border rounded-md p-2" placeholder={lessonPlan?.teachingDetails.methodology} />
        </div>

        <div className="w-full  flex flex-col gap-2">
          <p>Recursos Didáticos</p>
          <input type="text" className="border rounded-md p-2" placeholder={lessonPlan?.teachingDetails.resources} />
        </div>

        <div className="flex w-1/3 justify-center gap-4 items-center">
          <button className="mt-4 w-full rounded-md bg-gray-300 text-gray-700 p-1">Cancelar</button>
          <button className="mt-4 w-full rounded-md bg-blue-500 text-white p-1">Atualizar</button>
        </div>
      </div>
    </>
  )
}
