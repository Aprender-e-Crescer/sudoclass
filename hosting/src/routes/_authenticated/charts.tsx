import { createFileRoute } from '@tanstack/react-router'
import { ChartConfig } from '@/components/ui/chart'
import { SectorChart } from '@/components/custom/sector-chart'
import { useChartsQuery } from '@/queries/use-charts-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Definir quais informaçaões a gente precisa mostrar no front
// - Score médio da turma - média entre notas, presença e atividades entregues
//   - Notas - média das notas dos alunos
//     - Buscar a nota de cada um dos alunos
//   - Presença - média das presenças dos alunos
//     - Buscar a presença de cada um dos alunos
//   - Atividades entregues - média das atividades entregues dos alunos
//     - Buscar as atividades entregues de cada um dos alunos
// - Score médio em Banco de Dados
//   - Notas
//   - Presença
//   - Atividades entregues
// ...outras materias

// - Para pegar as notas ficou complicado, melhor criar uma ou mais rotas para isso
// - getAllSchoolCalls - Vamos buscar todas chamadas que existem no banco
// - Ideal, é que tenha uma rota que a gente consiga pegar todas as informações da dashboard

// Rota - Geral
//   - Uma rota para listar os alunos de uma turma especifica

// Rota - Tela dempenho - geral / turma
//   - Uma rota para listar as presenças e faltas de todos os alunos de uma turma especifica, tem que vir de qual máteria é
const schoolCalls = [
  {
    id_chamada: 1,
    id_materia: 1,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 1,
    status: true,
  },
  {
    id_chamada: 2,
    id_materia: 1,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 2,
    status: false,
  },
  {
    id_chamada: 1,
    id_materia: 2,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 1,
    status: true,
  },
  {
    id_chamada: 2,
    id_materia: 2,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 2,
    status: false,
  },
  {
    id_chamada: 3,
    id_materia: 2,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 3,
    status: false,
  }
]


//   - Uma rota para listar as notas de todos os alunos de uma turma especifica, tem que vir de qual máteria é
//   - Uma rota para listar o status de cada atividade de todos os alunos de uma turma especifica, tem que vir de qual máteria é

// Rota - Tela dempenho - geral / materia de uma turma
//   - Uma rota para listar as presenças e faltas de todos os alunos de uma máteria especifica, tem que vir de qual máteria é

const subjetcCalls = [
  {
    id_chamada: 1,
    id_materia: 1,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 1,
    status: true,
  },
  {
    id_chamada: 1,
    id_materia: 1,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 2,
    status: true,
  },
  {
    id_chamada: 1,
    id_materia: 1,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 3,
    status: true,
  },
  {
    id_chamada: 1,
    id_materia: 1,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 4,
    status: true,
  },
  {
    id_chamada: 1,
    id_materia: 1,
    id_turma: 1,
    data: '2024-11-20',
    id_aluno: 5,
    status: true,
  },
]


//   - Uma rota para listar as notas de todos os alunos de uma máteria especifica, tem que vir de qual máteria é  além de qual atividade é
const subjects = [
  {
    
  },
]
//   - Uma rota para listar o status de cada atividade de todos os alunos de uma máteria especifica, tem que vir de qual máteria é



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
              id,
              data,
              descriptionChart,
              endAngle,
              innerRadius,
              outerRadius,
              polarRadius,
              valueSize,
            },
          ) => (
            <div key={id} className="flex-1 min-w-80 p-2">
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
