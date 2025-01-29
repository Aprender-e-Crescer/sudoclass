import { InputTeachingPlans } from '@/components/custom/input-teaching-plan'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/input-teaching-plan',
)({
  component: InputTeachingPlan,
})

export function InputTeachingPlan() {
  return (
    <>
      <div className=" w-full flex">
        <InputTeachingPlans schoolMatrixId="aQjvxCKlEuHc9YQEedCQ" />
      </div>
    </>
  )
}
