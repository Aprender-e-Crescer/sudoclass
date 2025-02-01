import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useCreateWarningMutation } from '@/mutations/use-create-warning-mutation'
import { useGetCourseById } from '@/queries/use-get-course-by-id'
import { useGetProfileQuery } from '@/queries/use-get-profile-query'
import { useGetSubjectByIdQuery } from '@/queries/use-get-subject-by-id-query'
import { useGetWarningsQuery } from '@/queries/use-get-warnings-query'
import { useSentByProfilesQueries } from '@/queries/use-sent-by-profiles-queries'

interface DTO {
    idCourse: string
    idClass: string
    idSubject: string
    onWarningCreationSuccess: () => void | undefined
}

export function useWarningController({ idCourse, idClass, idSubject, onWarningCreationSuccess }: DTO) {
    const fullUser = useGetFullUser()

    const { data: warnings, isLoading: isLoadingWarnings } = useGetWarningsQuery(idCourse, idClass, idSubject)
    const { data: subject, isLoading: isLoadingSubject } = useGetSubjectByIdQuery(idCourse, idClass, idSubject)
    const { data: course, isLoading: isLoadingCourse } = useGetCourseById(idCourse)
    const { data: profile } = useGetProfileQuery(fullUser?.profileRef);

    const { mutateAsync: createWarning } = useCreateWarningMutation({
        authorProfileRef: fullUser?.profileRef,
        onSuccess: onWarningCreationSuccess,
        onError: (error) => {
            console.error(error)
        }
    })

    const sentByProfiles = useSentByProfilesQueries(warnings)

    const isLoading = isLoadingWarnings || isLoadingSubject || isLoadingCourse

    const hasPermissionToSendWarning = fullUser?.role === 'teacher' || fullUser?.role === 'admin'

    const warningsWithSentByProfiles = warnings?.map(({ id, message, sentDate, sentByProfile }) => {
        const sentByProfileData = sentByProfiles.find(({ data: currentSentByProfile }) => {
            if (!currentSentByProfile) return false

            if (currentSentByProfile.id === sentByProfile.id) return true

            return false
        })

        const author = sentByProfileData?.data
            ? {
                name: sentByProfileData.data.displayName,
                profilePhotoSrc: sentByProfileData.data.photoURL,
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

    return { isLoading, subject, course, fullUser, warningsWithSentByProfiles, profile, hasPermissionToSendWarning, createWarning }
}