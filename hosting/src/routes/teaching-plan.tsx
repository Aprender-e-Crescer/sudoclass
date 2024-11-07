import { createFileRoute } from '@tanstack/react-router'
import { PlanTable } from '@/components/custom/plan-table'
<<<<<<< HEAD
import { useListSchoolMatricesQuery } from '@/queries/use-list-school-matrices'
=======
import { useListSchoolMatricesQuery } from '@/queries/use-list-school-matrices-query'
>>>>>>> f724c18c13d176eafacf0d6e256ae282de8e7978

export const Route = createFileRoute('/teaching-plan')({
  component: teachingPlan,
})

export function teachingPlan() {
  const { data, isLoading, error } = useListSchoolMatricesQuery()

  if (isLoading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    )
  }

  if (error) {
    return <h1>Erro ao carregar os dados</h1>
  }

  return (
    <>
      <div>
        <strong>
          <PlanTable curso="Curso" turma="Turma" turno="Turno" variant="undefined" />
        </strong>
      </div>

      <div className="w-full flex-col flex-1">
        {data?.map((matrice, index) => (
          <a href="input-teaching-plan">
            <PlanTable key={index} curso={matrice.name} turma="Turma 2024" turno="Noite" variant="checked" />
          </a>
        ))}
      </div>
    </>
  )
}
