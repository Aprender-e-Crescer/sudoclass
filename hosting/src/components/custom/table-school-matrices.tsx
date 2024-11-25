import { Eye } from 'lucide-react'
import { GenericTable } from './generic-table'
import { Link } from '@tanstack/react-router'

export function TableSchoolMatrices() {
  const columns = [
    { header: 'Matriz', accessor: 'name', tooltip: 'Analise de desenvolvimento de sistemas' },
    { header: 'Carga Horaria', accessor: 'workLoad' },
    {
      header: 'Ações',
      Cell: (row: any) => (
        <Link to={row.to} className="underline cursor-pointer flex items-center gap-1">
          <Eye />
        </Link>
      ),
    },
  ]

  const data = [
    {
      name: 'ANALISE DE DESENVOLVIMENTO...',
      workLoad: '60 Horas',
      to: '/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/details',
    },
    {
      name: 'UI/UX',
      workLoad: '60 Horas',
      to: '/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/details',
    },
    {
      name: 'UI/UX',
      workLoad: '60 Horas',
      to: '/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/details',
    },
    {
      name: 'UI/UX',
      workLoad: '60 Horas',
      to: '/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/details',
    },
    {
      name: 'UI/UX',
      workLoad: '60 Horas',
      to: '/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/details',
    },
  ]

  return <GenericTable data={data} columns={columns} />
}
