import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Subheader } from '@/components/custom/subheader';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/password-changes" className="[&.active]:font-bold">
          password changes
        </Link>
      </div>
      <hr />
      <Outlet />
      <Subheader classroomType="student"/>
      <TanStackRouterDevtools />
    </>
  ),
});
