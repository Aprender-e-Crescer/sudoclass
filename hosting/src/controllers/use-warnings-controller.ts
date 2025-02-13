import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { Warning } from '@/models/warning-schema'
import { useCreateWarningMutation } from '@/mutations/use-create-warning-mutation'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getCourseFirestoreQuery, getCourseQueryOptions } from '@/queries/use-get-course-by-id'
import { getProfileFirestoreQuery, getProfileQueryOptions } from '@/queries/use-get-profile-query'
import { getSubjectFirestoreQuery, getSubjectQueryOptions } from '@/queries/use-get-subject-by-id-query'
import { getSubjectsQueryOptions } from '@/queries/use-get-subjects-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getProfileQueriesOptions } from '@/queries/use-sent-by-profiles-queries'
import { getWarningsFirestoreQuery, getWarningsQueryOptions } from '@/queries/use-warnings-query'
import { QueryClient, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

interface DTO {
    idCourse: string
    idClass: string
    idSubject: string
    onWarningCreationSuccess: () => void | undefined
}

const getUniqueSentByProfileIds = (warnings: Warning[]) => Array.from(new Set(warnings?.map(({ sentByProfile }) => sentByProfile.id))) 

export const warningRouteLoader = async ({ idClass, idCourse, idSubject, queryClient }: Omit<DTO, 'onWarningCreationSuccess'> & { queryClient: QueryClient }) => {
    const warningsPromise = queryClient.ensureQueryData(getWarningsQueryOptions(idCourse, idClass, idSubject))
    const subjectsPromise = queryClient.ensureQueryData(getSubjectsQueryOptions(idCourse, idClass))
    const coursePromise = queryClient.ensureQueryData(getCourseQueryOptions(idCourse))

    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions())
    const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    
    const profilePromise = queryClient.ensureQueryData(getProfileQueryOptions(user.ref))

    const warnings = await warningsPromise;

    return Promise.all([
      subjectsPromise,
      coursePromise,
      profilePromise,
      getProfileQueriesOptions(
        getUniqueSentByProfileIds(warnings.docs.map(doc => doc.data()))
      ).map(options => queryClient.ensureQueryData(options))
    ].flat())
  }

export function useWarningController({ idCourse, idClass, idSubject, onWarningCreationSuccess }: DTO) {
    const fullUser = useGetFullUser()

    const warningsQueryOptions = getWarningsQueryOptions(idCourse, idClass, idSubject)
    const subjectsQueryOptions = getSubjectQueryOptions(idCourse, idClass, idSubject)
    const courseQueryOptions = getCourseQueryOptions(idCourse)
    const profileQueryOptions = getProfileQueryOptions(fullUser.profileRef)

    const { data: warnings } = useSuspenseQuery(warningsQueryOptions)
    const { data: subject } = useSuspenseQuery(subjectsQueryOptions)
    const { data: course } = useSuspenseQuery(courseQueryOptions)
    const { data: profile } = useSuspenseQuery(profileQueryOptions)

    useFirestoreRealtimeQuery(warningsQueryOptions.queryKey, getWarningsFirestoreQuery(idCourse, idClass, idSubject))
    useFirestoreRealtimeQuery(subjectsQueryOptions.queryKey, getSubjectFirestoreQuery(idCourse, idClass, idSubject))
    useFirestoreRealtimeQuery(courseQueryOptions.queryKey, getCourseFirestoreQuery(idCourse))
    useFirestoreRealtimeQuery(profileQueryOptions.queryKey, getProfileFirestoreQuery(fullUser.profileRef))

    const { mutateAsync: createWarning } = useCreateWarningMutation({
        authorProfileRef: fullUser.profileRef,
        onSuccess: onWarningCreationSuccess,
        onError: (error) => {
            console.error(error)
        }
    })

    const sentByProfileIds = useMemo(() => getUniqueSentByProfileIds(warnings), [warnings])
    const sentByProfiles = useSuspenseQueries({
        queries: getProfileQueriesOptions(sentByProfileIds)
    })

    const hasPermissionToSendWarning = fullUser.role === 'teacher' || fullUser.role === 'admin'

    const warningsWithSentByProfiles = warnings.map(({ id, message, sentDate, sentByProfile }) => {
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

    return { subject, course, warningsWithSentByProfiles, profile, hasPermissionToSendWarning, createWarning }
}