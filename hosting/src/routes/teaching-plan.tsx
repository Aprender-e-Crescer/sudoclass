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
     Curso='Curso'
     Turma='Turma'
     Turno='Turno'
     Altura='h-24'
     variant='undefined'
     />
     </strong>
     </div>

     <div className='flex flex-col'>
     <PlanTable
     Curso='Aprender e Crescer'
     Turma='Turma 2024'
     Turno='Noite'
     Altura='h-14'
     variant='checked'
     />
     <PlanTable
     Curso='Aprender e Crescer'
     Turma='Turma 2024'
     Turno='Noite'
     Altura='h-14'
     variant='nochecked'
     />
        <PlanTable
     Curso='Aprender e Crescer'
     Turma='Turma 2024'
     Turno='Noite'
     Altura='h-14'
     variant='checked'
     />
        <PlanTable
     Curso='Aprender e Crescer'
     Turma='Turma 2024'
     Turno='Noite'
     Altura='h-14'
     variant='nochecked'
     />
        <PlanTable
     Curso='Aprender e Crescer'
     Turma='Turma 2024'
     Turno='Noite'
     Altura='h-14'
     variant='checked'
     />
    <PlanTable 
     Curso='Aprender e Crescer'
     Turma='Turma 2024'
     Turno='Noite'
     Altura='h-14'
     variant='nochecked'
     />
     </div>
   </>
  )
}
