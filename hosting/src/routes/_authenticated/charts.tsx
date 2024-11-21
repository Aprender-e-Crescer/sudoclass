import { createFileRoute } from '@tanstack/react-router'
import { ChartConfig } from '@/components/ui/chart'
import { SectorChart } from '@/components/custom/sector-chart'
import { useChartsQuery } from '@/queries/use-charts-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Ajustar o código
// Definir quais informaçaões a gente precisa mostrar no front
// Definir como calcular isso, o formato desses dados
// Pegar informações do back end
//   - Queries, 

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  safari: {
    label: 'Safari',
    color: '#D9D9D9',
  },
} satisfies ChartConfig

export const Route = createFileRoute('/_authenticated/charts')({
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
          (
            {
              data,
              descriptionChart,
              endAngle,
              innerRadius,
              outerRadius,
              polarRadius,
              valueSize,
            },
            index,
          ) => (
            <div key={index} className="flex-1 min-w-80 p-2">
              <SectorChart chartData={data} chartConfig={chartConfig} descriptionChart={descriptionChart} endAngle={endAngle} polarRadius={polarRadius} innerRadius={innerRadius} outerRadius={outerRadius} valueSize={valueSize}/>
            </div>
          ),
        )}
      </div>
      <Table className="min-w-full mt-16">
        <TableHeader>
            <TableRow className="bg-gray-200 text-gray-600  text-md">
                <TableHead className="py-3 px-6 text-center border-r">Nome</TableHead>
                <TableHead className="py-3 px-6 text-center border-r">Score Geral</TableHead>
                <TableHead className="py-3 px-6 text-center border-r">Presença</TableHead>
                <TableHead className="py-3 px-6 text-center border-r">Notas</TableHead>
                <TableHead className="py-3 px-6 text-center border-r">Atividades entregues</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody className="text-md">
          <TableRow className="border-b">
              <TableCell className="py-3 px-6 text-center border-r">NomeDoAluno1</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">95.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">100.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">95.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
          </TableRow>
          <TableRow className="border-b">
              <TableCell className="py-3 px-6 text-center border-r">NomeDoAluno2</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">95.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">100.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">95.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
          </TableRow>
          <TableRow className="border-b">
              <TableCell className="py-3 px-6 text-center border-r">NomeDoAluno3</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">95.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">100.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">100.0</TableCell>
          </TableRow>
          <TableRow className="border-b">
              <TableCell className="py-3 px-6 text-center border-r">NomeDoAluno4</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">100.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">80.0</TableCell>
          </TableRow>
          <TableRow className="border-b">
              <TableCell className="py-3 px-6 text-center border-r">NomeDoAluno5</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">100.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">95.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">75.0</TableCell>
          </TableRow>
          <TableRow className="border-b">
              <TableCell className="py-3 px-6 text-center border-r">NomeDoAluno6</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">95.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">85.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
          </TableRow>
          <TableRow className="border-b">
              <TableCell className="py-3 px-6 text-center border-r">NomeDoAluno7</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">95.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">90.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">85.0</TableCell>
          </TableRow>
          <TableRow className="border-b">
              <TableCell className="py-3 px-6 text-center border-r">NomeDoAluno8</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">85.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">100.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">85.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">70.0</TableCell>
          </TableRow>
          <TableRow className="border-b">
              <TableCell className="py-3 px-6 text-center border-r">NomeDoAluno9</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">85.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">95.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">80.0</TableCell>
              <TableCell className="py-3 px-6 text-center border-r">80.0</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
