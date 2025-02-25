import { useQuery } from '@tanstack/react-query'
import { getLessonPlanByIdQueryOptions } from '@/queries/use-get-lesson-plan-by-id'
import { useUpdateLessonPlanMutation } from '@/mutations/use-update-lesson-plan'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { useNavigate } from '@tanstack/react-router'

interface UpdateLessonPlanProps {
  idCourse: string
  idClass: string
  idSubject: string
  idsLessonPlan: string
}

export function useUpdateLessonPlanController({ idCourse, idClass, idSubject, idsLessonPlan }: UpdateLessonPlanProps) {
  const navigate = useNavigate() 
  
  const { data: lessonPlan, refetch: lessonPlanRefetch, isLoading: loadingLessonPlannings } = useQuery({
    queryKey: ['lessonPlan', idCourse, idClass, idSubject, idsLessonPlan],
    queryFn: getLessonPlanByIdQueryOptions(idCourse, idClass, idSubject, idsLessonPlan),
  })

  const { mutate, isPending: isUpdating } = useUpdateLessonPlanMutation()

  const parsedStartDate =
    lessonPlan?.startDate instanceof Timestamp ? lessonPlan.startDate.toDate() : lessonPlan?.startDate

  const parsedEndDate = lessonPlan?.endDate instanceof Timestamp ? lessonPlan.endDate.toDate() : lessonPlan?.endDate

  const formattedStartDate =
    parsedStartDate && !isNaN(parsedStartDate.getTime()) ? format(parsedStartDate, 'dd/MM/yyyy') : 'Invalid date'

  const formattedStartDateInicio =
    parsedStartDate && !isNaN(parsedStartDate.getTime()) ? format(parsedStartDate, 'HH:mm') : 'Invalid date'

  const formattedEndDate =
    parsedEndDate && !isNaN(parsedEndDate.getTime()) ? format(parsedEndDate, 'HH:mm') : 'Invalid date'

  const initialValues = {
    content: lessonPlan?.teachingDetails?.content || '',
    methodology: lessonPlan?.teachingDetails?.methodology || '',
    resources: lessonPlan?.teachingDetails?.resources || '',
  }

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    mutate(
      {
        id: idsLessonPlan,
        idCourse,
        idClass,
        idSubject,
        teachingDetails: {
          content: values.content,
          methodology: values.methodology,
          resources: values.resources,
        },
      },
      {
        onSuccess: () => {
          console.log('Plano de aula atualizado com sucesso!')
          setSubmitting(false)
          resetForm()
          lessonPlanRefetch()
          navigate({
            to: `/courses/${idCourse}/classes/${idClass}/subjects/${idSubject}/mural/lesson-plan/view`,
            params: {
              idCourse,
              idClass,
              idSubject,
            },
          })
        },
        onError: (error) => {
          console.error('Erro ao atualizar plano de aula:', error)
          setSubmitting(false)
        },
      },
    )
  }

  return {
    lessonPlan,
    formattedStartDate,
    formattedStartDateInicio,
    formattedEndDate,
    initialValues,
    handleSubmit,
    isUpdating,
    loadingLessonPlannings,
  }
}
