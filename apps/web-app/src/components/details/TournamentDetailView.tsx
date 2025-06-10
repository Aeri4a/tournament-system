import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import TournamentDetailBanner from './TournamentDetailBanner';
import TournamentDetailContentArea from './TournamentDetailContentArea';
import TournamentDetailSidebar from './TournamentDetailSidebar';
import { LuArrowLeft, LuPen } from 'react-icons/lu';
import { Route } from '@/routes/app/_layout/details.$tournamentId';
import { useQuery } from '@tanstack/react-query';
import { fetchTournamentById } from '@/api/tournamentApi';
import { TournamentDto } from 'common';
import { useRouter } from '@tanstack/react-router';

const TournamentDetailView = () => {
  const router = useRouter();
  const { tournamentId } = Route.useParams();

  const { data } = useQuery<TournamentDto, Error>({
    queryKey: ['tournamentDetails'],
    queryFn: () => fetchTournamentById(tournamentId),
  });

  const handleBackButton = () => {
    router.history.back();
  };

  return (
    <Flex direction={'column'}>
      <Flex alignContent={'center'} justifyContent={'space-between'} pb={10}>
        <IconButton p={3} variant={'outline'} onClick={handleBackButton}>
          <LuArrowLeft /> Back to previous
        </IconButton>
        <Heading as="h2" size="xl">
          Overview
        </Heading>
        <IconButton width={200}>
          <LuPen />
          Manage
        </IconButton>
      </Flex>
      <TournamentDetailBanner
        name={data?.name ?? ''}
        sponsorLogos={data?.sponsorLogoUrls ?? []}
      />
      <Grid
        templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
        gap={8}
        alignItems="start"
      >
        <GridItem>
          <TournamentDetailContentArea
            locationAddress={data?.locationAddress ?? ''}
            startTime={data?.startTime ?? new Date().toString()}
            registrationDeadline={
              data?.registrationDeadline ?? new Date().toString()
            }
            participants={data?.participants ?? []}
          />
        </GridItem>
        <GridItem>
          <TournamentDetailSidebar
            organizer={data?.organizer ?? { firstName: '', lastName: '' }}
            participants={data?.participants ?? []}
            maxParticipants={data?.maxParticipants ?? 0}
          />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default TournamentDetailView;
