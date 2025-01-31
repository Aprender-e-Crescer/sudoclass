import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useGetCourseById } from '@/queries/use-get-course-by-id'
import { useGetSubjectByIdQuery } from '@/queries/use-get-subject-by-id-query'
import { useGetWarningsQuery } from '@/queries/use-get-warnings-query'
import { useSentByProfilesQueries } from '@/queries/use-sent-by-profiles-queries'

interface DTO {
    idCourse: string
    idClass: string
    idSubject: string
}

export function useWarningController({ idCourse, idClass, idSubject }: DTO) {
    const { data: warnings, isLoading: isLoadingWarnings } = useGetWarningsQuery(idCourse, idClass, idSubject)
    const { data: subject, isLoading: isLoadingSubject } = useGetSubjectByIdQuery(idCourse, idClass, idSubject)
    const { data: course, isLoading: isLoadingCourse } = useGetCourseById(idCourse)

    const sentByProfiles = useSentByProfilesQueries(warnings)

    const fullUser = useGetFullUser()

    const isLoading = isLoadingWarnings || isLoadingSubject || isLoadingCourse

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

    return { isLoading, subject, course, fullUser, warningsWithSentByProfiles }
}