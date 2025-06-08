import DetailsPage from '@/pages/DetailsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/details/$tournamentId')({
  component: DetailsPage,
});
