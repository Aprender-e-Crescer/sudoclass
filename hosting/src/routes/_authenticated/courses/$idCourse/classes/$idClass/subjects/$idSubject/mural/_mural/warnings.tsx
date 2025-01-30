import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '@/components/custom/card-bolletin-board'
import { CustomLoading } from '@/components/custom/custom-loading'
import { useGetWarningsQuery } from '@/queries/use-get-warnings-query'
import { Warning } from '@/components/custom/warning'
import { useGetSubjectByIdQuery } from '@/queries/use-get-subject-by-id-query'
import { useGetCourseById } from '@/queries/use-get-course-by-id'
import { useSentByProfilesQueries } from '@/queries/use-sent-by-profiles-queries'
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'
import { useGetFullUser } from '@/hooks/use-get-full-user'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/warnings',
)({
  component: WallSubjects,
})

export function WallSubjects() {
  const { idCourse, idClass, idSubject } = Route.useParams()
  const { data: warnings, isError, error, isLoading } = useGetWarningsQuery(idCourse, idClass, idSubject)
  const sentByProfiles = useSentByProfilesQueries(warnings)
  const { data: subject } = useGetSubjectByIdQuery(idCourse, idClass, idSubject)
  const { data: course } = useGetCourseById(idCourse)
  const fullUser = useGetFullUser()

  const warningsWithSentByProfiles = warnings?.map(({ id, message, sentDate, sentByProfile }) => {
    const sentByProfileData = sentByProfiles.find(({ data: currentSentByProfile }) => {
      if (!currentSentByProfile) return false

      if (currentSentByProfile.id === sentByProfile.id) return true

      return false
    })

    const author = sentByProfileData?.data
      ? {
          name: sentByProfileData.data.displayName,
          profilePhotoSrc: sentByProfileData.data.photoUrl,
        }
      : undefined

    return {
      key: id,
      id: id,
      date: sentDate,
      message: message,
      author: author,
    }
  })

  // const fullUser = useGetFullUser()
  // console.log('Dados da subject:', subject)
  // console.log('Dados de warnings:', warnings)
  // console.log('Dados do fullUser:', fullUser)

  if (isLoading) {
    return (
      <>
        <div className="w-full h-full flex items-center justify-center">
          <CustomLoading message="Carregando mural" size={70} />
        </div>
      </>
    )
  }

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full max-w-screen-lg p-4 sm:p-6 flex flex-col gap-5">
        <div className="my-2 mx-auto w-full sm:max-w-md lg:max-w-full">
          <CardComponent name={subject?.name} courseName={course?.name} color={subject?.color} />
        </div>

        <div className="w-full">
          {/* <p>{fullUser?.displayName}</p>
          <img src={fullUser?.photoURL ?? undefined} className="w-16 h-auto rounded-full" alt="" /> */}

          {fullUser?.role === 'teacher' || fullUser?.role === 'admin' ? (
            <div>
              <div className="flex items-center border-2 p-7 rounded-lg shadow-xl">
                <img src={fullUser?.photoURL} alt="Icon" className="w-12 h-12 mr-2 rounded-full " />
                <input
                  type="text"
                  placeholder="Escreva um aviso para sua turma"
                  className="flex-grow p-2 rounded-md mx-4 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                />
                <button>
                  <SendHorizonal />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col p-5 gap-5">
          {warningsWithSentByProfiles?.map(({ author, date, id, key, message }) => (
            <Warning key={key} id={id} date={date} message={message} author={author} />
          ))}
        </div>
      </div>
    </div>
  )
}
