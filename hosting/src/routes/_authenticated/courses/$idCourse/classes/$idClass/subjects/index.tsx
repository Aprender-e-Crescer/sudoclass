import { createFileRoute, Link } from '@tanstack/react-router'
import { getSubjectsFirestoreQuery, getSubjectsQueryOptions } from '@/queries/use-get-subjects-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/$idClass/subjects/')({
  loader: ({ params: { idClass, idCourse }, context: { queryClient } }) =>
    queryClient.ensureQueryData(getSubjectsQueryOptions(idCourse, idClass)),
  component: HomeListSubjects,
})

function HomeListSubjects() {
  const { idClass, idCourse } = Route.useParams()

  const subjectsQueryOptions = getSubjectsQueryOptions(idCourse, idClass)

  const { data: subjects } = useSuspenseQuery(subjectsQueryOptions)

  useFirestoreRealtimeQuery(subjectsQueryOptions.queryKey, getSubjectsFirestoreQuery(idCourse, idClass))

  return (
    <div>
      <p className="w-full flex justify-center text-3xl font-bold mb-5 text-[#0B366F]">Materias</p>
      <div className="flex flex-wrap gap-5 justify-center items-center mt-6">
        {subjects?.map(({ id, name, color }) => (
          <Link to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/warnings" params={{ idClass, idCourse, idSubject: id }} key={id}>
            <div
              className="w-[200px] md:w-[400px] h-[200px] rounded-lg shadow-lg flex flex-col justify-between"
              style={{ backgroundColor: color }}
            >
              <div className="flex justify-between m-6">
                <div className="flex flex-col">
                  <div className="text-white font-bold text-xl mr-5 mb-1">{name}</div>
                </div>
              </div>
              <div className="bg-white w-full rounded-b-lg py-6"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
