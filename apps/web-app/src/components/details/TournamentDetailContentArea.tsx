import { formatDate } from '@/utils/dataFormatter';
import { Box, Flex, Tabs, VStack, Text, Heading } from '@chakra-ui/react';
import { UserBasicDto } from 'common';
import { FC } from 'react';

interface TournamentDetailContentAreaProps {
  registrationDeadline: string;
  startTime: string;
  locationAddress: string;
  participants: UserBasicDto[];
}

const TournamentDetailContentArea: FC<TournamentDetailContentAreaProps> = ({
  registrationDeadline,
  startTime,
  locationAddress,
  participants,
}) => (
  <Box>
    <Tabs.Root variant="enclosed" defaultValue={'Overview'}>
      <Tabs.List>
        <Tabs.Trigger value="Overview" width={150}>
          Overview
        </Tabs.Trigger>
        <Tabs.Trigger value="Location" width={150}>
          Location
        </Tabs.Trigger>
        <Tabs.Trigger value="Players" width={150}>
          Players
        </Tabs.Trigger>
        <Tabs.Trigger value="Results" width={150}>
          Results
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="Overview">
        <VStack align="stretch" mt={4}>
          {/* Status Section */}
          <Flex
            justifyContent="space-around"
            p={4}
            bg="bg.muted"
            borderRadius="md"
          >
            <VStack>
              <Text color="red.400">● Registration deadline</Text>
              <Text fontSize="sm">{formatDate(registrationDeadline)}</Text>
            </VStack>
            <VStack>
              <Text color="green.400">● Start date</Text>
              <Text fontSize="sm">{formatDate(startTime)}</Text>
            </VStack>
          </Flex>

          {/* About Section */}
          <VStack align="start" pt={8}>
            <Heading as="h3" size="lg">
              About
            </Heading>
            <Text>Description about tournament</Text>
          </VStack>
        </VStack>
      </Tabs.Content>
      <Tabs.Content value="Location">
        <Text>{locationAddress}</Text>
      </Tabs.Content>
      <Tabs.Content value="Players">
        <Text>Players content goes here.</Text>
      </Tabs.Content>
      <Tabs.Content value="Results">
        <Text>Results content goes here.</Text>
      </Tabs.Content>
    </Tabs.Root>
  </Box>
);

export default TournamentDetailContentArea;
