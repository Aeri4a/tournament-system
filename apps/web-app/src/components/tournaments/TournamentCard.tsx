import { formatDate } from '@/utils/dataFormatter';
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
import { useNavigate } from '@tanstack/react-router';

interface TournamentCardProps {
  bannerImageUrl?: string;
  tournamentName: string;
  organizerName: string;
  currentParticipants: number;
  maxParticipants: number;
  deadline: string;
  onJoin?: () => void;
  sponsorLogos?: string[];
  id: number;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  id,
  bannerImageUrl,
  tournamentName,
  organizerName,
  currentParticipants,
  maxParticipants,
  deadline,
  onJoin,
  sponsorLogos,
}) => {
  const navigate = useNavigate();

  const navigateToDetailPage = () => {
    navigate({ to: `/app/details/${id}` });
  };

  return (
    <Card.Root
      overflow="hidden"
      variant="outline"
      maxW="lg"
      borderRadius="lg"
      boxShadow="md"
      minWidth={300}
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
            cursor={'pointer'}
            onClick={navigateToDetailPage}
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
                <Text fontSize="sm">Organizer</Text>
              </Box>
              <Box textAlign={{ base: 'left', md: 'right' }}>
                <Heading size="md" mb="1">
                  {currentParticipants} / {maxParticipants}
                </Heading>
                <Text fontSize="sm">Participants</Text>
              </Box>
            </Flex>
          </Card.Body>
          <Card.Footer bg="colorPalette.panel" p="4" borderTop="1px solid">
            <Flex align="center" width="100%">
              <Box>
                <Text fontWeight="bold">Participate deadline</Text>
                <Text fontSize="sm">{formatDate(deadline)}</Text>
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
