import { Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

interface SubHeaderProps {
  hasPrivilege?: 'teacher' | 'student' | 'pedagogue'
}
export function SubHeader({ hasPrivilege }: SubHeaderProps) {
  const location = useLocation()
  const [selectedLink, setSelectedLink] = useState<string>('')

  useEffect(() => {
    const path = location.pathname
    if (path.includes('mural')) {
      setSelectedLink('mural')
    } else if (path.includes('activities')) {
      setSelectedLink('activities')
    } else if (path.includes('notes')) {
      setSelectedLink('notes')
    } else if (path.includes('lesson-plan')) {
      setSelectedLink('lesson-plan')
    } else if (path.includes('call')) {
      setSelectedLink('call')
    } else if (path.includes('attendance')) {
      setSelectedLink('attendance')
    } else if (path.includes('student')) {
      setSelectedLink('student')
    } else if (path.includes('teacher')) {
      setSelectedLink('teacher')
    } else if (path.includes('classes')) {
      setSelectedLink('classes')
    } else if (path.includes('pedagogue')) {
      setSelectedLink('pedagogue')
    }
  }, [location])

  return (
    <>
      <div className="flex w-full justify-center p-4 border-b-2">
        <div className="flex gap-5 ">
          {hasPrivilege === 'teacher' ? (
            <>
              <Link
                to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject"
                onClick={() => setSelectedLink('mural')}
                className={`${selectedLink === 'mural' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Mural</p>
              </Link>

              <Link
                to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/activities"
                onClick={() => setSelectedLink('activities')}
                className={`${selectedLink === 'activities' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Atividades</p>
              </Link>

              <Link
                to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/notes-screen"
                onClick={() => setSelectedLink('notes')}
                className={`${selectedLink === 'notes' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Notas</p>
              </Link>

              <Link
                to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/lesson-plan/$idLessonPlan/lesson-plan-view"
                onClick={() => setSelectedLink('lesson-plan')}
                className={`${selectedLink === 'lesson-plan' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Plano de aula</p>
              </Link>
              <Link
                to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/call"
                onClick={() => setSelectedLink('call')}
                className={`${selectedLink === 'call' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Chamada</p>
              </Link>
            </>
          ) : null}

          {hasPrivilege === 'pedagogue' ? (
            <>
              <Link
                to="/register/students"
                onClick={() => setSelectedLink('student')}
                className={`${selectedLink === 'student' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Aluno</p>
              </Link>

              <Link
                to="/register/teachers"
                onClick={() => setSelectedLink('teacher')}
                className={`${selectedLink === 'teacher' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Professor</p>
              </Link>

              <Link
                to="/register/classes"
                onClick={() => setSelectedLink('classes')}
                className={`${selectedLink === 'classes' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Turmas</p>
              </Link>

              <Link
                to="/register/pedagogo"
                onClick={() => setSelectedLink('pedagogue')}
                className={`${selectedLink === 'pedagogue' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Pedagogo</p>
              </Link>
              <Link
                to="/"
                onClick={() => setSelectedLink('attendance')}
                className={`${selectedLink === 'attendance' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Frequência</p>
              </Link>
            </>
          ) : null}

          {hasPrivilege === 'student' ? (
            <>
              <Link
                to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject"
                onClick={() => setSelectedLink('mural')}
                className={`${selectedLink === 'mural' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Mural</p>
              </Link>

              <Link
                to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/activities"
                onClick={() => setSelectedLink('activities')}
                className={`${selectedLink === 'activities' ? 'font-bold text-lg' : 'text-lg'} transform hover:scale-110 transition-all`}
              >
                <p>Atividades</p>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
