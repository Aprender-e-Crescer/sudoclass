import { createFileRoute } from '@tanstack/react-router'
import { InputTeachingPlans } from '@/components/custom/input-teaching-plan';



export const Route = createFileRoute('/input-teaching-plan')({
  component: InputTeachingPlan,
});

export function InputTeachingPlan() {
  return (
    <>
      <div className=' w-full flex'>
      <InputTeachingPlans
        contentLabel=''
        methodologyLabel=''
        resourcesLabel=''
      />
      </div>
    </>
  );
}
