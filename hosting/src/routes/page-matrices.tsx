import { TableSchoolMatrices } from "@/components/custom/table-school-matrices";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/page-matrices')({
    component: PageMatrices,
});

 export function PageMatrices() {

    return (
        <div className="p-5">
            <p className="text-3xl font-bold mb-5 text-[#0B366F]">MATRIZ ESCOLAR</p>
            <TableSchoolMatrices />
        </div>
    );
}