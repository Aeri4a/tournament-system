import { Flex, Grid, GridItem, Heading, IconButton } from '@chakra-ui/react';
import TournamentDetailBanner from './TournamentDetailBanner';
import TournamentDetailContentArea from './TournamentDetailContentArea';
import TournamentDetailSidebar from './TournamentDetailSidebar';
import { LuPen } from 'react-icons/lu';
import { Route } from '@/routes/app/_layout/details.$tournamentId';
import { useQuery } from '@tanstack/react-query';
import { fetchTournamentById } from '@/api/tournamentApi';
import { TournamentDto } from 'common';

const TournamentDetailView = () => {
  const { tournamentId } = Route.useParams();

  const { data } = useQuery<TournamentDto, Error>({
    queryKey: ['tournamentDetails'],
    queryFn: () => fetchTournamentById(tournamentId),
  });

  return (
    <Flex direction={'column'}>
      <Flex alignContent={'center'} justifyContent={'space-between'}>
        <Heading as="h2" size="xl" mb={6}>
          Overview
        </Heading>
        <IconButton width={200}>
          <LuPen />
          Manage
        </IconButton>
      </Flex>
      <TournamentDetailBanner
        name={data?.name ?? ''}
        sponsorLogos={data?.sponsorLogos ?? []}
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
