import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/charts')({
  component: () => (
    <div className="mt-3 mb-2">
      <li>
        <Link
          to="/charts/$idClass/materia-presences"
          className="menu-link cursor-pointer text-gray-500"
        >
          Presença
        </Link>
      </li>
      <li>
        <Link
          to="/charts/$idClass/medium-notes"
          className="menu-link cursor-pointer text-gray-500"
        >
          Notas
        </Link>
      </li>
      <li>
        <Link
          to="/charts/$idClass/medium-presences"
          className="menu-link cursor-pointer text-gray-500"
        >
          Média de presença
        </Link>
      </li>
      <li>
        <Link
          to="/charts/$idClass/turma-presences"
          className="menu-link cursor-pointer text-gray-500"
        >
          Presença da turma
        </Link>
      </li>
      <Outlet />
    </div>
  ),
})
