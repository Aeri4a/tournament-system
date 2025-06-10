import ResetPasswordPage from '@/pages/ResetPasswordPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/reset-password')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
        replace: true,
      });
    }
  },
  component: ResetPasswordPage,
});
