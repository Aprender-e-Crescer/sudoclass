import { createFileRoute } from '@tanstack/react-router'
import { ChartConfig } from '@/components/ui/chart'
import { SectorChart } from '@/components/custom/sector-chart'
import { useChartsQuery } from '@/queries/use-charts-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  safari: {
    label: 'Safari',
    color: '#D9D9D9',
  },
} satisfies ChartConfig

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/charts',
)({
  component: ChartsScreen,
})

function ChartsScreen() {
  const { data: chartDocs, isLoading, error } = useChartsQuery()

  if (isLoading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    )
  }

  if (error) return <h1>Erro ao carregar os dados: {error.message}</h1>

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {chartDocs?.map(
          ({
            id,
            data,
            descriptionChart,
            endAngle,
            innerRadius,
            outerRadius,
            polarRadius,
            valueSize,
          }) => (
            <div key={id} className="flex-1 min-w-75 p-2">
              <SectorChart
                chartData={data}
                chartConfig={chartConfig}
                descriptionChart={descriptionChart}
                endAngle={endAngle}
                polarRadius={polarRadius}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                valueSize={valueSize}
              />
            </div>
          ),
        )}
      </div>
      <Table className="min-w-full mt-16">
        <TableHeader>
          <TableRow className="bg-gray-200 text-gray-600  text-md">
            <TableHead className="py-3 px-6 text-center border-r">
              Nome
            </TableHead>
            <TableHead className="py-3 px-6 text-center border-r">
              Nota média
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-md border-b">
          <TableRow className="border-b">
            <TableCell className="py-3 px-6 text-center border-r border-l">
              NomeDoAluno1
            </TableCell>
            <TableCell className="py-3 px-6 text-center border-r border-l">
              95.0
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
