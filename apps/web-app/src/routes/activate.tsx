import { useUserActivationMutation } from '@/api/authApi';
import { Box, Link, Text } from '@chakra-ui/react';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/activate')({
  component: RouteComponent,
});

function RouteComponent() {
  const query: { token: string } = useSearch({ from: '/activate' });
  const activateUserMutation = useUserActivationMutation();

  useEffect(() => {
    if (query['token']) {
      activateUserMutation.mutate({ token: query['token'] });
    }
  }, []);

  return (
    <Box minH="100vh" position="relative" p={4} textAlign="center">
      <Text fontSize="xl" textAlign="center" mt={4}>
        Account activated successfully!
      </Text>
      <Link href="/login">
        <Text color="blue.500" textAlign="center" mt={2} fontSize="lg">
          Go to login page
        </Text>
      </Link>
    </Box>
  );
}
