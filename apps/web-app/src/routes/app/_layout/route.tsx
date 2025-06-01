import LeftBar from '@/components/layout/LeftBar';
import UpperBar from '@/components/layout/UpperBar';
import { Container, Flex, Separator } from '@chakra-ui/react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

const Layout = () => {
  return (
    <Flex direction={'column'} minH={'100vh'}>
      <UpperBar />
      <Separator />
      <Flex bg={'blackAlpha.100'} flex={1}>
        <LeftBar />
        <Container flex={1} overflowY="auto">
          <Outlet />
        </Container>
      </Flex>
    </Flex>
  );
};

export const Route = createFileRoute('/app/_layout')({
  component: Layout,
});
