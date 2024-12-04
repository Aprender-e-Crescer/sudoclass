import { Link } from '@tanstack/react-router'

interface SubHeaderProps {
  hasPrivilege?: 'teacher' | 'student' | 'pedagogue' | 'requests'
}

export function SubHeader({ hasPrivilege = 'student' }: SubHeaderProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const links = document.querySelectorAll('.menu-link')
    links.forEach((link) => link.classList.remove('font-bold', 'text-gray-800'))

    e.currentTarget.classList.add('font-bold', 'text-gray-800')
  }

  let content

  if (hasPrivilege === 'student' || hasPrivilege === 'teacher') {
    content = (
      <>
        <li>
          <Link
            to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject"
            onClick={handleClick}
            className="menu-link cursor-pointer text-gray-500"
          >
            Mural
          </Link>
        </li>
        <li>
          <Link
            to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/activities"
            onClick={handleClick}
            className="menu-link cursor-pointer text-gray-500"
          >
            Atividades
          </Link>
        </li>
        <li>
          <Link
            to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/notes-screen"
            onClick={handleClick}
            className="menu-link cursor-pointer text-gray-500"
          >
            Notas
          </Link>
        </li>
        <li>
          <Link
            to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/lesson-plan/$idLessonPlan/lesson-plan-view"
            onClick={handleClick}
            className="menu-link cursor-pointer text-gray-500"
          >
            Plano de Aula
          </Link>
        </li>
        <li>
          {hasPrivilege === 'teacher' ? (
            <Link
              to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/call"
              onClick={handleClick}
              className="menu-link cursor-pointer text-gray-500"
            >
              Chamada
            </Link>
          ) : (
            <Link to="/" onClick={handleClick} className="menu-link cursor-pointer text-gray-500">
              Frequência
            </Link>
          )}
        </li>
      </>
    )
  } else if (hasPrivilege === 'pedagogue') {
    content = (
      <>
        <li>
          <Link to="/register/students" onClick={handleClick} className="menu-link cursor-pointer text-gray-500">
            Aluno
          </Link>
        </li>
        <li>
          <Link to="/register/teachers" onClick={handleClick} className="menu-link cursor-pointer text-gray-500">
            Professor
          </Link>
        </li>
        <li>
          <Link to="/register/classes" onClick={handleClick} className="menu-link cursor-pointer text-gray-500">
            Turmas
          </Link>
        </li>
        <li>
          <Link to="/register/pedagogo" onClick={handleClick} className="menu-link cursor-pointer text-gray-500">
            Pedagogo
          </Link>
        </li>
      </>
    )
  } else if (hasPrivilege === 'requests') {
    content = (
      <>
        <li>
          <Link to="/password-change-request" onClick={handleClick} className="menu-link cursor-pointer text-gray-500">
            Solicitações de troca de senha
          </Link>
        </li>
        <li>
          <Link to="/justifications" onClick={handleClick} className="menu-link cursor-pointer text-gray-500">
            justificativas de falta
          </Link>
        </li>
      </>
    )
  }

  return (
    <div className="flex pb-2 justify-center border-b mt-2">
      <ul className="flex space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide">{content}</ul>
    </div>
  )
}
