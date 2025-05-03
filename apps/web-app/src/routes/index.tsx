import { createFileRoute } from '@tanstack/react-router';

const Index = () => {
  return <div>Tournament component here</div>;
};

export const Route = createFileRoute('/')({
  component: Index,
});
