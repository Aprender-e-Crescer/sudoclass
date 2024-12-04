import { useState } from 'react';
import { GenericTableLessonPlanView } from '@/components/custom/generic-table-lesson-plan-view';
import { createFileRoute } from '@tanstack/react-router';
import { useListLessonPlan } from '@/queries/use-list-lesson-plan';
import { LessonPlan } from '@/models/lesson-plan';

// Definindo a rota com apenas o idLessonPlan
export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/lesson-plan/$idLessonPlan/lesson-plan-view',
)({
  component: LessonPlanView,
  parseParams: (params: { idLessonPlan: string }) => {
    return { idLessonPlan: String(params.idLessonPlan) };
  },
});



export function LessonPlanView() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const { data: lessonPlans = [], isLoading, isError, error } = useListLessonPlan();
  console.log(error);
  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar planos de aula</p>;

  const formattedData = lessonPlans.map((lessonPlan: LessonPlan) => ({
    ...lessonPlan,
    idProfessor: lessonPlan.id_professor,
    idLessonPlan: lessonPlan.id_planoaula,
    data_aula: new Date(lessonPlan.data_aula).toLocaleDateString('pt-BR'),
    datainicio: [...lessonPlan.inicio_aula].join('').slice(0, -3),
    datafim: [...lessonPlan.fim_aula].join('').slice(0, -3),
    detalhes: (
      <>
        <p>1. Conteúdo Formativo: {lessonPlan.conteudoformativo || 'Não disponível'}</p>
        <p>2. Modo de Ensino: {lessonPlan.mododeensino || 'Não disponível'}</p>
        <p>3. Recursos Didáticos: {lessonPlan.recursosdidaticos || 'Não disponível'}</p>
      </>
    ),
  }));
  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const columns = [
    { header: 'Data da Aula', accessor: 'data_aula' },
    { header: 'Início', accessor: 'datainicio' },
    { header: 'Fim', accessor: 'datafim' },
    { header: 'Detalhes do Plano', accessor: 'detalhes' },
    { accessor: 'actions' },
  ];

  return (
    <GenericTableLessonPlanView
      data={formattedData}
      columns={columns}
      expandedRows={expandedRows}
      toggleRow={toggleRow}
    />
  );
}
