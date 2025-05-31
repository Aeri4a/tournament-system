import { StrictMode, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './routeTree.gen';
import { User } from 'common';
import { useAuthStore } from './store/authStore';
import { useCheckSessionMutation } from './api/authApi';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface RouterContext {
    auth: {
      isAuthenticated: boolean;
      user: User | null;
    };
  }
}

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: {
      user: null,
      isAuthenticated: false,
    },
  },
});
const queryClient = new QueryClient();

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  const { user, isAuthenticated } = useAuthStore();
  const checkSessionMutation = useCheckSessionMutation();

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      user,
    }),
    [isAuthenticated, user],
  );

  useEffect(() => {
    checkSessionMutation.mutate();
  }, []);

  if (checkSessionMutation.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <RouterProvider router={router} context={{ auth: authContextValue }} />
  );
};

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  createRoot(rootElement).render(
    <StrictMode>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </StrictMode>,
  );
}
