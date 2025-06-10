import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/forgot-password')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
        replace: true,
      });
    }
  },
  component: ForgotPasswordPage,
});
