import TournamentsPage from '@/pages/TournamentsPage';
import { itemsSearchSchema } from '@/zod/searchValidation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/')({
  validateSearch: (search) => itemsSearchSchema.parse(search),
  component: TournamentsPage,
});
