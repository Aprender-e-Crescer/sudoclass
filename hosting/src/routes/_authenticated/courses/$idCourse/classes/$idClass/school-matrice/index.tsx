import { GenericTable } from '@/components/custom/generic-table'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetSubjectsByStudentQuery } from '@/queries/use-get-subjects-by-student-query'
// import { useGetUserQuery } from '@/queries/use-get-user-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Eye, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/')({
  component: () => PageMatrices(),
})

export function PageMatrices() {
  const currentUser = useCurrentUserQuery()
  const { data: userData } = useGetUserQuery(currentUser?.data?.uid)
  const { data: subjectsData, isLoading, error } = useGetSubjectsByStudentQuery(userData?.idStudent)

  const columns = [
    { header: 'Matriz', accessor: 'name' },
    { header: 'Carga Horaria', accessor: 'workload' },
    {
      header: 'Ações',
      Cell: (row: any) => (
        <Link
          to={`/courses/$idCourse/classes/$idClass/school-matrice/subjects/${row.id}/details`}
          className="underline cursor-pointer flex items-center gap-1"
        >
          <Eye />
        </Link>
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    )
  }

  if (error) {
    return 'Erro ao buscar Matriz'
  }

  return (
    <div className="p-5">
      <p className="text-3xl font-bold mb-5 text-[#0B366F]">MATRIZ ESCOLAR</p>
      <GenericTable data={subjectsData ?? []} columns={columns} />
    </div>
  )
}
