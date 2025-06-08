import {
  Avatar,
  AvatarGroup,
  Button,
  Heading,
  VStack,
  Text,
  HStack,
  Separator,
} from '@chakra-ui/react';
import { UserBasicDto } from 'common';
import { FC } from 'react';

interface TournamentDetailSidebarProps {
  participants: UserBasicDto[];
  organizer: Pick<UserBasicDto, 'firstName' | 'lastName'>;
  maxParticipants: number;
}

const TournamentDetailSidebar: FC<TournamentDetailSidebarProps> = ({
  participants,
  organizer,
  maxParticipants,
}) => {
  const organizerFullName = `${organizer.firstName} ${organizer.lastName}`;

  return (
    <VStack align="stretch">
      {/* TODO: conditionally display */}
      <Button>Apply or cancel or login if not</Button>

      {/* Players Section */}
      <VStack p={4} borderRadius="md" align="stretch" bg="bg.muted">
        <Heading as="h4" size="md">
          Players
        </Heading>
        {/* <Text fontSize="sm" color="gray.400">
          Registered Players
        </Text> */}
        <AvatarGroup size="md">
          {participants.map((participant) => (
            <Avatar.Root key={participant.id}>
              <Avatar.Fallback
                name={`${participant.firstName} ${participant.lastName}`}
              />
              <Avatar.Image src="/path-to-avatar1.jpg" />
            </Avatar.Root>
          ))}
        </AvatarGroup>
        <Separator />
        <HStack justifyContent="space-between">
          <Text fontSize="md">{`Registered: ${participants.length}`}</Text>
          <Text fontSize="md">{`Available: ${maxParticipants - participants.length}`}</Text>
        </HStack>
      </VStack>

      {/* Organizer Section */}
      <VStack bg="bg.muted" p={4} borderRadius="md" align="stretch">
        <Heading as="h4" size="md">
          Organizer
        </Heading>
        <HStack>
          <Avatar.Root size={'sm'}>
            <Avatar.Fallback name={organizerFullName} />
            <Avatar.Image />
          </Avatar.Root>
          <Text>{organizerFullName}</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default TournamentDetailSidebar;
