import { useState } from 'react'
import { GenericTableLessonPlanView } from '@/components/custom/generic-table-lesson-plan-view'
import { createFileRoute } from '@tanstack/react-router'
import { useListLessonPlan } from '@/queries/use-list-lesson-plan'

// Alteração: Remover a parte de idLessonPlan da rota
export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/lesson-plan/$idLessonPlan/lesson-plan-view',
)({
  component: LessonPlanView,
})

export function LessonPlanView() {
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const { data: lessonPlanData, isLoading, isError } = useListLessonPlan() 

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  const columns = [
    { header: 'Data', accessor: 'data_aula' },
    { header: 'Início', accessor: 'datainicio' },
    { header: 'Fim', accessor: 'datafim' },
    { header: 'Plano de Aula', accessor: 'conteudoformativo' },
    { header: '', accessor: 'actions' },
  ]

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Erro ao carregar lesson plans</p>

  const data = lessonPlanData ? [lessonPlanData] : []

  return (
    <GenericTableLessonPlanView
      data={data}
      columns={columns}
      expandedRows={expandedRows}
      toggleRow={toggleRow}
    />
  )
}
