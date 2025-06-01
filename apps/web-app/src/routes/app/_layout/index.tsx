import TournamentsPage from '@/pages/TournamentsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/')({
  component: TournamentsPage,
});
