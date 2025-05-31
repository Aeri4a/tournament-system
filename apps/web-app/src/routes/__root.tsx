import { ColorModeButton } from '@/components/ui/color-mode';
import { RouterContext } from '@/types/routerContext';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';

// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      {/* <Link to="/" className="[&.active]:font-bold">
          Home
        </Link> */}
      {/* <div>
        <ColorModeButton />
      </div> */}
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
