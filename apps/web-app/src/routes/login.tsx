import LoginPage from '@/pages/LoginPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
        replace: true,
      });
    }
  },
  component: LoginPage,
});
