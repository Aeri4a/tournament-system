import {
  Avatar,
  AvatarGroup,
  Button,
  Heading,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';

const TournamentDetailSidebar = () => (
  <VStack align="stretch">
    {/* TODO: conditionally display */}
    <Button>Apply or cancel or login if not</Button>

    {/* Players Section */}
    <VStack p={4} borderRadius="md" align="stretch" bg="bg.muted">
      <Heading as="h4" size="md">
        Players
      </Heading>
      <Text fontSize="sm" color="gray.400">
        Registered Players
      </Text>
      <AvatarGroup size="md">
        <Avatar.Root>
          <Avatar.Fallback name="P 1" />
          <Avatar.Image src="/path-to-avatar1.jpg" />
        </Avatar.Root>
      </AvatarGroup>
      <HStack justifyContent="space-between">
        <Text fontSize="sm">{`Confirmed: 15 Players`}</Text>
        <Text fontSize="sm">{`Available: 7 Slots`}</Text>
      </HStack>
    </VStack>

    {/* Organizer Section */}
    <VStack bg="bg.muted" p={4} borderRadius="md" align="stretch">
      <Heading as="h4" size="md">
        Organizer
      </Heading>
      <HStack>
        <Avatar.Root size={'sm'}>
          <Avatar.Fallback name="Quentin Beck" />
          <Avatar.Image src="/path-to-admin1.jpg" />
        </Avatar.Root>
        <Text>Quentin Beck</Text>
      </HStack>
    </VStack>
  </VStack>
);

export default TournamentDetailSidebar;
