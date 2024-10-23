import { useState } from "react";
import { GenericTableLessonPlanView } from "./GenericTableLessonPlanView"; // Renomeado

export function LessonPlanView() { // Renomeado
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const columns = [
    { header: "Data", accessor: "date" },
    { header: "Início", accessor: "start" },
    { header: "Fim", accessor: "end" },
    { header: "Plano de Aula", accessor: "lessonPlan" },
    { header: "", accessor: "actions" },
  ];

  const data = [
    {
      date: "01/10/2024",
      start: "18:30",
      end: "22:30",
      lessonPlan: "1 - Lógica em geral, introdução. Proposição, Conectivos Lógicos, Tabelas verdade. 2 - Introdução à informática, hardware e software.",
      actions: null,
    },
    {
      date: "02/10/2024",
      start: "18:30",
      end: "22:30",
      lessonPlan: "1 - Fundamentos de design. 2 - Princípios de usabilidade.",
      actions: null,
    },
    {
      date: "03/10/2024",
      start: "18:30",
      end: "22:30",
      lessonPlan: "1 - Introdução a bancos de dados. 2 - Modelagem de dados.",
      actions: null,
    },
    {
      date: "04/10/2024",
      start: "18:30",
      end: "22:30",
      lessonPlan: "1 - Estruturas de controle. 2 - Algoritmos de ordenação.",
      actions: null,
    },
    {
      date: "05/10/2024",
      start: "18:30",
      end: "22:30",
      lessonPlan: "1 - Ciclo de vida de software. 2 - Metodologias ágeis.",
      actions: null,
    },
    {
      date: "06/10/2024",
      start: "18:30",
      end: "22:30",
      lessonPlan: "1 - Fundamentos de segurança. 2 - Criptografia e segurança de dados.",
      actions: null,
    },
  ];

  return (
    <GenericTableLessonPlanView data={data} columns={columns} expandedRows={expandedRows} toggleRow={toggleRow} />
  );
}
