import { useTournamentStore } from '@/store/tournamentStore';
import {
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Separator,
} from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { LuChevronLeft, LuChevronRight, LuSearch } from 'react-icons/lu';

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
      <Flex pt={5}>cards</Flex>
    </Flex>
  );
};

export default TournamentView;
