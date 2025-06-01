import { RouterContext } from '@/types/routerContext';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
