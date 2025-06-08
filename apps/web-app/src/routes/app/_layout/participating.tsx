import ParticipatingPage from '@/pages/ParticipatingPage';
import { itemsSearchSchema } from '@/zod/searchValidation';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/participating')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        replace: true,
      });
    }
  },
  validateSearch: (search) => itemsSearchSchema.parse(search),
  component: ParticipatingPage,
});
