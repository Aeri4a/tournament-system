import {
  Card,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Spacer,
  AspectRatio,
  Image,
} from '@chakra-ui/react';

interface TournamentCardProps {
  bannerImageUrl?: string;
  tournamentName: string;
  organizerName: string;
  currentParticipants: number;
  maxParticipants: number;
  deadline: string;
  onJoin?: () => void;
  sponsorLogos?: string[];
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  bannerImageUrl,
  tournamentName,
  organizerName,
  currentParticipants,
  maxParticipants,
  deadline,
  onJoin,
  sponsorLogos,
}) => {
  return (
    <Card.Root
      overflow="hidden"
      variant="outline"
      width="100%"
      maxW="lg"
      borderRadius="lg"
      boxShadow="md"
    >
      <Flex>
        <Flex direction="column" flex="6" p="0">
          <Box
            bg={bannerImageUrl ? `url(${bannerImageUrl})` : 'gray.200'}
            backgroundSize="cover"
            backgroundPosition="center"
            minH="200px"
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            p="4"
          >
            <Heading
              size="lg"
              color={bannerImageUrl ? 'white' : 'gray.700'}
              textShadow={bannerImageUrl ? '0 0 5px black' : 'none'}
            >
              {tournamentName}
            </Heading>
          </Box>
          <Card.Body p="4">
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
            >
              <Box mb={{ base: '4', md: '0' }}>
                <Heading size="md" mb="1">
                  {organizerName}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Organizer
                </Text>
              </Box>
              <Box textAlign={{ base: 'left', md: 'right' }}>
                <Heading size="md" mb="1">
                  {currentParticipants} / {maxParticipants}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Participants
                </Text>
              </Box>
            </Flex>
          </Card.Body>
          <Card.Footer
            bg="gray.100"
            p="4"
            borderTop="1px solid"
            borderColor="gray.200"
          >
            <Flex align="center" width="100%">
              <Box>
                <Text fontWeight="bold">Deadline</Text>
                <Text fontSize="sm">{deadline}</Text>
              </Box>
              <Spacer />
              {onJoin && (
                <Button colorScheme="teal" onClick={onJoin}>
                  Join Tournament
                </Button>
              )}
            </Flex>
          </Card.Footer>
        </Flex>

        {/* Sponsor Logos Vertical Area */}
        {sponsorLogos && sponsorLogos.length > 0 && (
          <Flex
            direction="column"
            bg="gray.300"
            flex="1"
            align="center"
            justify="center"
            borderLeft="1px solid"
            borderColor="gray.200"
          >
            <VStack>
              {sponsorLogos.map((logoUrl, index) => (
                <AspectRatio key={index} ratio={1} w="50px">
                  <Image
                    src={logoUrl}
                    alt={`Sponsor ${index + 1}`}
                    objectFit="contain"
                    border="1px solid"
                    borderColor="gray.400"
                    borderRadius="xl"
                  />
                </AspectRatio>
              ))}
            </VStack>
          </Flex>
        )}
      </Flex>
    </Card.Root>
  );
};

export default TournamentCard;
