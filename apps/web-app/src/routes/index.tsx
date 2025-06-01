import { createFileRoute, redirect } from '@tanstack/react-router';

const Index = () => <></>;

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/app',
      search: {
        pageSize: 10,
        pageNumber: 0,
      },
      replace: true,
    });
  },
  component: Index,
});
