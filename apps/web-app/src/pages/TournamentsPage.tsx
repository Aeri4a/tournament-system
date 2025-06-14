import TournamentView from '@/components/tournaments/TournamentView';
import { Box, Flex, Heading } from '@chakra-ui/react';

const TournamentsPage = () => (
  <Flex direction={'column'} gap={4}>
    <Heading size={'4xl'}>Open tournaments</Heading>
    <Box minHeight={200} bg={'gray.300'} borderRadius={'sm'}></Box>
    <TournamentView />
  </Flex>
);

export default TournamentsPage;
