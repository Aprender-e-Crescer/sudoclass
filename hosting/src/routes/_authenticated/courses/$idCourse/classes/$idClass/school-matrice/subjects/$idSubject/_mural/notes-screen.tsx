import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useListNotesQuery } from '@/queries/use-list-notes-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/notes-screen',
)( {
  component: StudentGrades,
})

interface Student {
  idAluno: number
  nomeAluno: string
  media: number | null
}

export default function StudentGrades() {
  const { idSubject } = Route.useParams()
  const subjectId = Number(idSubject)
  const { data, isLoading, error } = useListNotesQuery(subjectId)

  if (isLoading) {
    return <p className="p-4 text-center text-muted-foreground">Carregando...</p>
  }

  if (error) {
    return <p className="p-4 text-center text-red-500">Erro ao carregar os dados.</p>
  }

  const students: Student[] = data || []

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'bg' 
    if (grade > 7) return 'bg-green-50' 
    if (grade === 7) return 'bg-orange-50' 
    return 'bg-red-50'
  }
  

  return (
    <Card className="w-full">
      <CardHeader className="border-b p-4">
        <CardTitle className="text-lg sm:text-xl font-medium">Média geral</CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">Para cada aluno</p>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          {students.map((student) => (
            <div
              key={student.idAluno}
              className={`flex items-center justify-between p-4 ml-5 mr-5 rounded-sm ${getGradeColor(student.media)}`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white text-xs sm:text-sm">
                    {student.nomeAluno.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs sm:text-sm font-medium">{student.nomeAluno}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs sm:text-sm font-medium">
                  {student.media !== null ? `${student.media}/10` : '-/10'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
