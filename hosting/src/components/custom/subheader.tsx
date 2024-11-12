import { Link } from '@tanstack/react-router';

interface SubHeaderProps {
  hasPrivilege?: 'teacher' | 'student' | 'pedagogue';
}

export function SubHeader({ hasPrivilege = 'student' }: SubHeaderProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const links = document.querySelectorAll('.menu-link');
    links.forEach((link) => link.classList.remove('font-bold', 'text-gray-800'));

    e.currentTarget.classList.add('font-bold', 'text-gray-800');
  };

  return (
    <div className="flex pb-2">
      <ul className="flex space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {/* Exibir links comuns se o privilégio não for 'pedagogue' */}
        {hasPrivilege !== 'pedagogue' ? (
          <>
            <li>
              <Link
                to="/"
                onClick={handleClick}
                className="menu-link cursor-pointer text-gray-500"
              >
                Mural
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={handleClick}
                className="menu-link cursor-pointer text-gray-500"
              >
                Atividades
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={handleClick}
                className="menu-link cursor-pointer text-gray-500"
              >
                Notas
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={handleClick}
                className="menu-link cursor-pointer text-gray-500"
              >
                Plano de Aula
              </Link>
            </li>
            <li>
              {hasPrivilege === 'teacher' ? (
                <Link
                  to="/"
                  onClick={handleClick}
                  className="menu-link cursor-pointer text-gray-500"
                >
                  Chamada
                </Link>
              ) : (
                <Link
                  to="/"
                  onClick={handleClick}
                  className="menu-link cursor-pointer text-gray-500"
                >
                  Frequência
                </Link>
              )}
            </li>
          </>
        ) : (
          // Exibir links específicos para 'pedagogue' apenas
          <>
            <li>
              <Link
                to="/aluno"
                onClick={handleClick}
                className="menu-link cursor-pointer text-gray-500"
              >
                Aluno
              </Link>
            </li>
            <li>
              <Link
                to="/professor"
                onClick={handleClick}
                className="menu-link cursor-pointer text-gray-500"
              >
                Professor
              </Link>
            </li>
            <li>
              <Link
                to="/pedagogo"
                onClick={handleClick}
                className="menu-link cursor-pointer text-gray-500"
              >
                Pedagogo
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
