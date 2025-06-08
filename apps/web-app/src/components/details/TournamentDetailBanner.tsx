import {
  Box,
  Flex,
  VStack,
  Text,
  Heading,
  HStack,
  Image,
  AspectRatio,
  Spacer,
} from '@chakra-ui/react';

const SponsorLogo = ({ logoUrl }: { logoUrl: string }) => (
  <AspectRatio ratio={1} w="50px">
    <Image
      src={logoUrl}
      alt={`Sponsor`}
      objectFit="contain"
      borderRadius="xl"
    />
  </AspectRatio>
);

const TournamentDetailBanner = () => (
  <Box
    borderRadius="lg"
    p={6}
    mb={6}
    bgImage="url('/path-to-your-banner-image.jpg')" // could be banner here
    bgSize="cover"
    position="relative"
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={'bg.emphasized'}
      borderRadius="lg"
    />
    <Flex
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      zIndex={1}
    >
      <VStack align="start" gap={10}>
        <Box>
          <Text color="colorPalette.500" fontWeight="bold">
            Tournament
          </Text>
          <Heading as="h1" size="4xl">
            Victory Cup 2025
          </Heading>
        </Box>
        <Box>
          <HStack>
            <SponsorLogo logoUrl="https://ankiety.put.poznan.pl/images/logo.png" />
            <SponsorLogo logoUrl="https://ankiety.put.poznan.pl/images/logo.png" />
            <SponsorLogo logoUrl="https://ankiety.put.poznan.pl/images/logo.png" />
            <SponsorLogo logoUrl="https://ankiety.put.poznan.pl/images/logo.png" />
          </HStack>
          <Spacer />
          <Text pt={2}>Sponsors</Text>
        </Box>
      </VStack>
    </Flex>
  </Box>
);

export default TournamentDetailBanner;
