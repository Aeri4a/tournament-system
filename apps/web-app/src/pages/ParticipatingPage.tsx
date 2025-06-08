import ParticipatedView from '@/components/participated/ParticipatedView';
import { Flex, Heading } from '@chakra-ui/react';

const ParticipatingPage = () => (
  <Flex direction={'column'} gap={4}>
    <Heading size={'4xl'}>Registered in tournaments</Heading>
    <ParticipatedView />
  </Flex>
);

export default ParticipatingPage;
