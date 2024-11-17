import { TableSchoolMatrices } from '@/components/custom/table-school-matrices'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/')({
  component: () => (
    <div className="p-5">
      <p className="text-3xl font-bold mb-5 text-[#0B366F]">MATRIZ ESCOLAR</p>
      <TableSchoolMatrices />
    </div>
  ),
})
