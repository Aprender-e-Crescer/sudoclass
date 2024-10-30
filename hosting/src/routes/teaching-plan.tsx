import { createFileRoute } from '@tanstack/react-router'
import { PlanTable } from '@/components/custom/plan-table'

export const Route = createFileRoute('/teaching-plan')({
  component: teachingPlan,
})


export function teachingPlan() {
  return (
   <>
    <div>
      <strong>
     <PlanTable
     curso='Curso'
     turma='Turma'
     turno='Turno'
     altura='h-24'
     variant='undefined'
     />
     </strong>
     </div>

     <div className='flex flex-col'>
     <PlanTable
     curso='Aprender e Crescer'
     turma='Turma 2024'
     turno='Noite'
     altura='h-14'
     variant='checked'
     />
     <PlanTable
     curso='Aprender e Crescer'
     turma='Turma 2024'
     turno='Noite'
     altura='h-14'
     variant='nochecked'
     />
    <PlanTable
     curso='Aprender e Crescer'
     turma='Turma 2024'
     turno='Noite'
     altura='h-14'
     variant='checked'
     />
        <PlanTable
     curso='Aprender e Crescer'
     turma='Turma 2024'
     turno='Noite'
     altura='h-14'
     variant='nochecked'
     />
    <PlanTable
     curso='Aprender e Crescer'
     turma='Turma 2024'
     turno='Noite'
     altura='h-14'
     variant='checked'
     />
    <PlanTable 
     curso='Aprender e Crescer'
     turma='Turma 2024'
     turno='Noite'
     altura='h-14'
     variant='nochecked'
     />
     </div>
   </>
  )
}
