import { useState } from 'react';
import { GenericTableLessonPlanView } from '@/components/custom/generic-table-lesson-plan-view';
import { createFileRoute } from '@tanstack/react-router';
import { useListLessonPlan } from '@/queries/use-list-lesson-plan';

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/lesson-plan/$idLessonPlan/lesson-plan-view',
)({
  component: LessonPlanView,
  parseParams: (params) => {
      console.log('Parâmetros extraídos:', params);
      console.log( String(params.idLessonPlan));
    return { idLessonPlan: String(params.idLessonPlan) };
  },
});

export function LessonPlanView() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Requisição dos dados da API para pegar todos os planos de aula
  const { data: lessonPlans, isLoading, isError } = useListLessonPlan();

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar planos de aula</p>;

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };


  // Definição das colunas para a tabela
  const columns = [
    { header: 'Data', accessor: 'data_aula' },
    { header: 'Início', accessor: 'datainicio' },
    { header: 'Fim', accessor: 'datafim' },
    { header: 'Plano de Aula', accessor: 'conteudoformativo' },
    { header: '', accessor: 'actions' },
  ];

  return (
    <GenericTableLessonPlanView
      data={lessonPlans} // Passando os dados para o componente da tabela
      columns={columns}
      expandedRows={expandedRows}
      toggleRow={toggleRow}
    />
  );
}
