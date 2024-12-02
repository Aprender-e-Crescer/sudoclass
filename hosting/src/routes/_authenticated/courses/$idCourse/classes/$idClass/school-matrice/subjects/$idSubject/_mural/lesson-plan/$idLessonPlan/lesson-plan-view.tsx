import { useState } from 'react';
import { GenericTableLessonPlanView } from '@/components/custom/generic-table-lesson-plan-view';
import { createFileRoute } from '@tanstack/react-router';
import { useListLessonPlan } from '@/queries/use-list-lesson-plan';
import { LessonPlan } from '@/models/lesson-plan';

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/lesson-plan/$idLessonPlan/lesson-plan-view',
)({
  component: LessonPlanView,
  parseParams: (params) => {
    console.log('Parâmetros extraídos:', params);
    console.log(String(params.idLessonPlan));
    return { idLessonPlan: String(params.idLessonPlan) };
  },
});export function LessonPlanView() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const { data: lessonPlans = [], isLoading, isError } = useListLessonPlan();

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar planos de aula</p>;

  const formattedData = lessonPlans.map((lessonPlan: LessonPlan) => ({
    data_aula: new Date(lessonPlan.data_aula).toLocaleDateString('pt-BR'),
    datainicio: new Date(lessonPlan.datainicio).toLocaleDateString('pt-BR'),
    datafim: new Date(lessonPlan.datafim).toLocaleDateString('pt-BR'),
    detalhes: `${lessonPlan.conteudoformativo || '  '} 
               ${lessonPlan.mododeensino || '  '} 
               ${lessonPlan.recursosdidaticos || '  '}`.trim(),
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
    {accessor: 'actions' },
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
