import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useCreateWarningMutation } from '@/mutations/use-create-warning-mutation'
import { useGetCourseById } from '@/queries/use-get-course-by-id'
import { useGetProfileQuery } from '@/queries/use-get-profile-query'
import { useGetSubjectByIdQuery } from '@/queries/use-get-subject-by-id-query'
import { useGetWarningsQuery } from '@/queries/use-get-warnings-query'
import { useSentByProfilesQueries } from '@/queries/use-sent-by-profiles-queries'
import { useState } from 'react'

interface DTO {
    idCourse: string
    idClass: string
    idSubject: string
}

export function useWarningController({ idCourse, idClass, idSubject }: DTO) {
    const { data: warnings, isLoading: isLoadingWarnings, refetch: refetchWarnings } = useGetWarningsQuery(idCourse, idClass, idSubject)
    const { data: subject, isLoading: isLoadingSubject } = useGetSubjectByIdQuery(idCourse, idClass, idSubject)
    const { data: course, isLoading: isLoadingCourse } = useGetCourseById(idCourse)
    
    const sentByProfiles = useSentByProfilesQueries(warnings)

    const fullUser = useGetFullUser()

    const userPhoto = useGetProfileQuery(fullUser?.cpf);

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

      const { mutate: createWarning } = useCreateWarningMutation()
      
      const [message, setMessage] = useState('') 
    
     
    
      const handleSendWarning = () => {
        if (!message.trim())  return
      
        createWarning({
          message,
          idCourse,
          idClass,
          idSubject,
          authorId: userPhoto.data?.id || ""
    
        })
        refetchWarnings()
        
        setMessage('') 
      }
    

    return { isLoading, subject, course, fullUser, warningsWithSentByProfiles, userPhoto, refetchWarnings, hasPermissionToSendWarning, handleSendWarning, message, setMessage }
}