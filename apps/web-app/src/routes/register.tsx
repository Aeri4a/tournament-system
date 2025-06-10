import RegisterPage from '@/pages/RegisterPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/register')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        replace: true,
      });
    }
  },
  component: RegisterPage,
});
