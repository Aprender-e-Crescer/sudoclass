import { useGetFullUser } from '@/hooks/use-get-full-user'
import { Link } from '@tanstack/react-router'

interface SubHeaderProps {
  type?: 'requests' | undefined
}

export function SubHeader({ type }: SubHeaderProps) {
  const fullUser = useGetFullUser()

  const role = fullUser?.role

  if (type === 'requests') {
    return (
      <div className="flex w-full justify-center p-4 border-b-2">
        <div className="flex gap-5">
          <Link
            to="/password-change"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Senhas</p>
          </Link>
          <Link
            to="/justifications"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Justificativas</p>
          </Link>
        </div>
      </div>
    )
  }

  if (role === 'teacher') {
    return (
      <div className="flex w-full justify-center p-4 border-b-2">
        <div className="flex gap-5">
          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/warnings"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Mural</p>
          </Link>

          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Atividades</p>
          </Link>

          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/notes-screen"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Notas</p>
          </Link>

          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/lesson-plan/view"
            className="text-lg transform hover:scale-110 transition-all"
          >
            <p>Plano de aula</p>
          </Link>
        </div>
      </div>
    )
  }

  if (role === 'admin') {
    return (
      <div className="flex w-full justify-center p-4 border-b-2">
        <div className="flex gap-5">
          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/warnings"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Mural</p>
          </Link>

          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Atividades</p>
          </Link>

          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/frequency"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Frequência</p>
          </Link>

          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/lesson-plan/view"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Plano de aula</p>
          </Link>
        </div>
      </div>
    )
  }

  if (role === 'student') {
    return (
      <div className="flex w-full justify-center p-4 border-b-2">
        <div className="flex gap-5">
          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/warnings"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Mural</p>
          </Link>

          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Atividades</p>
          </Link>
          <Link
            to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/lesson-plan/view"
            className="text-lg transform hover:scale-110 transition-all"
            activeProps={{ className: 'font-bold' }}
          >
            <p>Plano de aula</p>
          </Link>
        </div>
      </div>
    )
  }

  return null
}
