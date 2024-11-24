import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/notes-screen',
)({
  component: StudentGrades,
})
interface Student {
  id: string
  name: string
  score: number | null
  initial: string
  color: string
}

const students: Student[] = [
  { id: '1', name: 'Ronald Richards', score: 100, initial: 'R', color: 'bg-orange-500' },
  { id: '2', name: 'Marvin McKinney', score: null, initial: 'M', color: 'bg-orange-400' },
  { id: '3', name: 'Jerome Bell', score: null, initial: 'J', color: 'bg-blue-500' },
  { id: '4', name: 'Kathryn Murphy', score: null, initial: 'K', color: 'bg-yellow-500' },
  { id: '5', name: 'Jacob Jones', score: null, initial: 'J', color: 'bg-red-500' },
  { id: '6', name: 'Kristin Watson', score: null, initial: 'K', color: 'bg-orange-400' },
  { id: '7', name: 'Kristin Watson', score: null, initial: 'K', color: 'bg-blue-500' },
  { id: '8', name: 'Kristin Watson', score: null, initial: 'K', color: 'bg-yellow-500' },
  { id: '9', name: 'Kristin Watson', score: null, initial: 'K', color: 'bg-red-500' },
]

export default function StudentGrades() {
  return (
    <Card className="w-full">
      <CardHeader className="border-b p-4 ">
        <CardTitle className="text-lg sm:text-xl font-medium">Média geral</CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">Para cada aluno</p>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${student.color} text-white text-xs sm:text-sm`}>
                    {student.initial}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs sm:text-sm font-medium">{student.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs sm:text-sm font-medium">
                  {student.score !== null ? `${student.score}/100` : '-/100'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
