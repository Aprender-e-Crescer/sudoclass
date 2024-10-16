import { GenericTable } from "./generic-table";

      
export function TableSchoolMatrices() {
  const columns = [ 
    { header: "Matriz", accessor: "name", tooltip: "Analise de desenvolvimento de sistemas" },
    { header: "Carga Horaria", accessor: "workLoad" },
  ];

  const data = [
    { name: "ANALISE DE DESENVOLVIMENTO...", workLoad: "60 Horas" },
    { name: "UI/UX", workLoad: "60 Horas" },
    { name: "UI/UX", workLoad: "60 Horas" },
    { name: "UI/UX", workLoad: "60 Horas" },
    { name: "UI/UX", workLoad: "60 Horas" },
  ];

  return <GenericTable data={data} columns={columns} />;
}

