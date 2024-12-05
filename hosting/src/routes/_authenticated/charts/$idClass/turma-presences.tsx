import { createFileRoute } from '@tanstack/react-router'
import { ChartConfig } from '@/components/ui/chart'
import { SectorChart } from '@/components/custom/sector-chart'
import {
  useChartsQuery,
  usePresenceTurmaQuery,
} from '@/queries/use-charts-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { z } from 'zod'

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
  '/_authenticated/charts/$idClass/turma-presences',
)({
  component: ChartsScreen,
})

function ChartsScreen() {
  const { idClass } = Route.useParams()
  const { data: chartDocs, isLoading, error } = useChartsQuery()
  const {
    data: presenceTurma,
    isLoading: isLoadingpresenceTurma,
    error: errorpresenceTurma,
  } = usePresenceTurmaQuery(idClass)

  if (isLoading || isLoadingpresenceTurma) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    )
  }

  if (error || errorpresenceTurma)
    return (
      <h1>
        Erro ao carregar os dados:{' '}
        {error?.message ?? errorpresenceTurma?.message}
      </h1>
    )

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
              Total de Chamadas
            </TableHead>
            <TableHead className="py-3 px-6 text-center border-r">
              Presenças
            </TableHead>
            <TableHead className="py-3 px-6 text-center border-r">
              Percentual de Presença
            </TableHead>
            <TableHead className="py-3 px-6 text-center border-r">
              Média de Notas
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-md border-b">
          {presenceTurma?.map(
            ({
              id_aluno,
              media_notas,
              total_chamadas,
              percentual_presenca,
              presencas,
            }) => (
              <TableRow key={id_aluno} className="border-b">
                <TableCell className="py-3 px-6 text-center border-r border-l">
                  {total_chamadas}
                </TableCell>
                <TableCell className="py-3 px-6 text-center border-r border-l">
                  {presencas ?? 'Não foi possível calcular a média'}
                </TableCell>
                <TableCell className="py-3 px-6 text-center border-r border-l">
                  {percentual_presenca ?? 'Não foi possível calcular a média'}
                </TableCell>
                <TableCell className="py-3 px-6 text-center border-r border-l">
                  {media_notas ?? 'Não foi possível calcular a média'}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  )
}
