import { InputTeachingPlans } from '@/components/custom/input-teaching-plan'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/input-teaching-plan')({
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
