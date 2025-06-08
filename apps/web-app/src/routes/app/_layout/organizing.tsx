import OrganizingPage from '@/pages/OrganizingPage';
import { itemsSearchSchema } from '@/zod/searchValidation';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/organizing')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        replace: true,
      });
    }
  },
  validateSearch: (search) => itemsSearchSchema.parse(search),
  component: OrganizingPage,
});
