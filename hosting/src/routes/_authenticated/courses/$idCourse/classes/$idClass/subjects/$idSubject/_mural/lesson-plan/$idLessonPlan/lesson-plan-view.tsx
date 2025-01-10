import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { GenericTableLessonPlanView } from '@/components/custom/generic-table-lesson-plan-view'
import { createFileRoute } from '@tanstack/react-router'
import { useListLessonPlan } from '@/queries/use-list-lesson-plan'
import { LessonPlan } from '@/models/lesson-plan'
import { LESSON_PLAN_QUERY_KEY } from '@/constants/queries'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/_mural/lesson-plan/$idLessonPlan/lesson-plan-view',
)({
  component: LessonPlanView,
  parseParams: (params: { idLessonPlan: string }) => {
    return { idLessonPlan: String(params.idLessonPlan) }
  },
})

export function LessonPlanView() {
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const queryClient = useQueryClient() // React Query Client

  const {
    data: lessonPlans = [],
    isLoading,
    isError,
    error,
  } = useListLessonPlan()

  if (isLoading) return <p>Carregando...</p>
  if (isError) return <p>Erro ao carregar planos de aula</p>

  const formattedData = lessonPlans.map((lessonPlan: LessonPlan) => ({
    ...lessonPlan,
    idProfessor: lessonPlan.id_professor,
    idLessonPlan: lessonPlan.id_planoaula,
    data_aula: new Date(lessonPlan.data_aula).toLocaleDateString('pt-BR'),
    datainicio: [...lessonPlan.inicio_aula].join('').slice(0, -3),
    datafim: [...lessonPlan.fim_aula].join('').slice(0, -3),
    detalhes: (
      <>
        <p>
          1. Conteúdo Formativo:{' '}
          {lessonPlan.conteudoformativo || 'Não disponível'}
        </p>
        <p>2. Modo de Ensino: {lessonPlan.mododeensino || 'Não disponível'}</p>
        <p>
          3. Recursos Didáticos:{' '}
          {lessonPlan.recursosdidaticos || 'Não disponível'}
        </p>
      </>
    ),
  }))

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  const handleDelete = async (lessonPlanId: string) => {
    try {
      await deleteClass(lessonPlanId)

      queryClient.invalidateQueries({ queryKey: LESSON_PLAN_QUERY_KEY })
    } catch (error) {
      console.error('Erro ao excluir o plano de aula:', error)
    }
  }

  const columns = [
    { header: 'Data da Aula', accessor: 'data_aula' },
    { header: 'Início', accessor: 'datainicio' },
    { header: 'Fim', accessor: 'datafim' },
    { header: 'Detalhes do Plano', accessor: 'detalhes' },
    {
      accessor: 'actions',
      cell: (row: any, rowIndex: number) => (
        <div>
          <button
            onClick={() => handleDelete(row.idLessonPlan)}
            className="text-red-500 hover:underline"
          >
            Excluir
          </button>
        </div>
      ),
    },
  ]

  return (
    <GenericTableLessonPlanView
      data={formattedData}
      columns={columns}
      expandedRows={expandedRows}
      toggleRow={toggleRow}
    />
  )
}
function deleteClass(lessonPlanId: string) {
  throw new Error('Function not implemented.')
}
