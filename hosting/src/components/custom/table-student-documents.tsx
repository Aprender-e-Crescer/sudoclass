import { ArrowBigDownDashIcon } from 'lucide-react'
import { GenericTable } from './generic-table'

export function TableStudentDocuments() {
  const columns = [
    { header: 'Documento', accessor: 'name' },
    { header: 'Disponibilidade', accessor: 'availability' },
    { header: 'Criado Por', accessor: 'createdBy' },
    { header: 'Criado Em', accessor: 'createdIn' },
    { header: 'Status', accessor: 'status' },
    { header: 'Ações', accessor: 'actions' },
  ]

  const data = [
    {
      name: 'Certidao Nascimento',
      availability: 'Desbloqueado',
      createdBy: 'Samara',
      createdIn: '10/10/2010',
      status: 'Ativo',
      actions: <ArrowBigDownDashIcon />,
    },
  ]

  return <GenericTable data={data} columns={columns} />
}
