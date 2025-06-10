import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  useDisclosure,
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
import TournamentManageDialog from './TournamentManageDialog';
import { useAuthStore } from '@/store/authStore';

const TournamentDetailView = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const { user } = useAuthStore();

  const router = useRouter();
  const { tournamentId } = Route.useParams();

  const { data } = useQuery<TournamentDto, Error>({
    queryKey: ['tournamentDetails'],
    queryFn: () => fetchTournamentById(tournamentId),
  });

  const handleBackButton = () => {
    router.history.back();
  };

  const isOrganizer = data?.organizerId === user?.id;

  return (
    <Flex direction={'column'}>
      {isOrganizer && data && (
        <TournamentManageDialog
          open={open}
          onClose={onClose}
          id={+tournamentId}
          name={data ? data.name : ''}
          location={data ? data.locationAddress : ''}
          deadline={data ? data.registrationDeadline : ''}
          time={data ? data.startTime : ''}
          maxParticipants={data ? data.maxParticipants : 16}
        />
      )}
      <Flex alignContent={'center'} justifyContent={'space-between'} pb={10}>
        <IconButton p={3} variant={'outline'} onClick={handleBackButton}>
          <LuArrowLeft /> Back to previous
        </IconButton>
        <Heading as="h2" size="xl">
          Overview
        </Heading>
        {isOrganizer && (
          <IconButton width={200} onClick={onOpen} size="lg" p={3}>
            <LuPen />
            Manage
          </IconButton>
        )}
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
