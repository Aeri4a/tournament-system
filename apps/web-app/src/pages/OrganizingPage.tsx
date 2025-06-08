import OrganizedView from '@/components/organized/OrganizedView';
import { Flex, Heading } from '@chakra-ui/react';

const OrganizingPage = () => (
  <Flex direction={'column'} gap={4}>
    <Heading size={'4xl'}>Organized tournaments</Heading>
    <OrganizedView />
  </Flex>
);

export default OrganizingPage;
