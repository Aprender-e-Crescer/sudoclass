import { Link } from '@tanstack/react-router';

interface SubHeaderProps {
  hasPrivilege?: 'teacher' | 'student';
}

export function SubHeader({ hasPrivilege = 'student' }: SubHeaderProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    
    const links = document.querySelectorAll('.menu-link');
    links.forEach((link) => link.classList.remove('font-bold', 'text-gray-800'));

    
    e.currentTarget.classList.add('font-bold', 'text-gray-800');
  };

  return (
    <div className="flex justify-center items-center pb-2">
      <ul className="flex space-x-6">
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
      </ul>
    </div>
  );
}
