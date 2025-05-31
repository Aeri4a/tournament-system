import { createFileRoute, redirect } from '@tanstack/react-router';

const Index = () => {
  return <div>Empty for now</div>;
};

export const Route = createFileRoute('/')({
  // beforeLoad: ({ context }) => {
  //   if (!context.auth.isAuthenticated) {
  //     throw redirect({
  //       to: '/login',
  //       replace: true,
  //     });
  //   }
  // },
  component: Index,
});
