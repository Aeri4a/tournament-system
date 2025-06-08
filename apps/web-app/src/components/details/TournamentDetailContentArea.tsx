import { Box, Flex, Tabs, VStack, Text, Heading } from '@chakra-ui/react';

const TournamentDetailContentArea = () => (
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
              <Text color="red.400">● Deadline</Text>
              <Text fontSize="sm">2025-01-01 17:30</Text>
            </VStack>
            <VStack>
              <Text color="green.400">● Start</Text>
              <Text fontSize="sm">2025-01-01 17:30</Text>
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
        <Text>Location content goes here.</Text>
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
