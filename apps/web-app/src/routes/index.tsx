import { createFileRoute, redirect } from '@tanstack/react-router';

const Index = () => <></>;

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/app',
      replace: true,
    });
  },
  component: Index,
});
