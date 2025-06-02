// import { useTournamentStore } from '@/store/tournamentStore';
import {
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Separator,
  SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { LuChevronLeft, LuChevronRight, LuSearch } from 'react-icons/lu';
import TournamentCard from './TournamentCard';

const TournamentView = () => {
  //   const {  } = useTournamentStore();
  const search = useSearch({ from: '/app' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!('pageSize' in search) || !('pageNumber' in search)) {
      navigate({
        to: '/',
      });
    }
  }, []);

  return (
    <Flex direction={'column'}>
      <Flex justifyContent={'space-between'} pb={5}>
        <InputGroup endElement={<LuSearch />} width={400}>
          <Input />
        </InputGroup>
        <Pagination.Root>
          <ButtonGroup variant="ghost" size="sm">
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
      <SimpleGrid minChildWidth="sm" gap="40px" py={6} justifyItems={'center'}>
        {/* EXAMPLE CARDS */}
        <TournamentCard
          currentParticipants={2}
          maxParticipants={5}
          deadline="25-05-2025 17:30"
          organizerName="PP"
          tournamentName="Tournament"
          bannerImageUrl="https://bi.im-g.pl/im/f1/7b/1d/z30913521IEG,Tenis-stolowy--zdjecie-ilustracyjne-.jpg"
          sponsorLogos={[
            'https://www.poznan.nocnaukowcow.pl/wp-content/uploads/2014/08/politechnika.png',
            'https://www.poznan.nocnaukowcow.pl/wp-content/uploads/2014/08/politechnika.png',
            'https://www.poznan.nocnaukowcow.pl/wp-content/uploads/2014/08/politechnika.png',
            'https://www.poznan.nocnaukowcow.pl/wp-content/uploads/2014/08/politechnika.png',
          ]}
          onJoin={() => {}}
        />
        <TournamentCard
          currentParticipants={2}
          maxParticipants={5}
          deadline="25-05-2025 17:30"
          organizerName="PP"
          tournamentName="Tournament"
          bannerImageUrl="https://bi.im-g.pl/im/f1/7b/1d/z30913521IEG,Tenis-stolowy--zdjecie-ilustracyjne-.jpg"
          sponsorLogos={[
            'https://www.poznan.nocnaukowcow.pl/wp-content/uploads/2014/08/politechnika.png',
            'https://www.poznan.nocnaukowcow.pl/wp-content/uploads/2014/08/politechnika.png',
            'https://www.poznan.nocnaukowcow.pl/wp-content/uploads/2014/08/politechnika.png',
            'https://www.poznan.nocnaukowcow.pl/wp-content/uploads/2014/08/politechnika.png',
          ]}
          onJoin={() => {}}
        />
      </SimpleGrid>
    </Flex>
  );
};

export default TournamentView;
