import {
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Separator,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { LuChevronLeft, LuChevronRight, LuSearch } from 'react-icons/lu';
import TournamentCard from './TournamentCard';
import { useQuery } from '@tanstack/react-query';
import { PageResponse, TournamentDto } from 'common';
import { fetchUpcomingTournaments } from '@/api/tournamentApi';
import { useDebounce } from 'use-debounce';
import { useState } from 'react';

const TournamentView = () => {
  const navigate = useNavigate();
  const query: { pageSize: number; pageNumber: number } = useSearch({
    from: '/app',
  });
  const pageSize = query['pageSize'];
  const pageNumber = query['pageNumber'];

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search.trim(), 500);

  const { data, isLoading } = useQuery<PageResponse<TournamentDto>, Error>({
    queryKey: ['upcomingTournaments', pageSize, pageNumber, debouncedSearch],
    queryFn: () =>
      fetchUpcomingTournaments({
        limit: pageSize,
        page: pageNumber,
        ...(search !== '' && { search }),
      }),
  });

  const tournaments = data ? data.data : [];
  const totalPages = data ? data.total : 0;

  const setPage = (newPageNumber: number) => {
    navigate({
      to: '/app',
      search: {
        pageSize,
        pageNumber: newPageNumber,
      },
      replace: true,
    });
  };

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  // useEffect(() => {
  //   if (!('pageSize' in query) || !('pageNumber' in query)) {
  //     navigate({
  //       to: '/',
  //     });
  //   }
  // }, []);

  return (
    <Flex direction={'column'}>
      <Flex justifyContent={'space-between'} pb={5}>
        <InputGroup endElement={<LuSearch />} width={400}>
          <Input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
        <Pagination.Root
          count={totalPages}
          pageSize={pageSize}
          page={pageNumber}
          onPageChange={(e) => setPage(e.page)}
        >
          <ButtonGroup variant="outline" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Flex>

      <Separator />
      {isLoading && (
        <Flex alignItems={'center'} justifyContent={'center'} py={50}>
          <Spinner />
        </Flex>
      )}
      <Flex py={6} gap={10} flexWrap={'wrap'}>
        {tournaments.length > 0 ? (
          tournaments.map((tour) => (
            <TournamentCard
              key={tour.id}
              id={tour.id}
              currentParticipants={0}
              maxParticipants={tour.maxParticipants}
              organizerName={`${tour.organizer.firstName} ${tour.organizer.lastName}`}
              deadline={tour.registrationDeadline}
              tournamentName={tour.name}
              sponsorLogos={tour.sponsorLogoUrls}
            />
          ))
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
};

export default TournamentView;
