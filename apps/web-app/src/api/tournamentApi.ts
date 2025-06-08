import axios from '@/config/axiosConfig';
import { PageResponse, QueryTournamentDto, TournamentDto } from 'common';

const API_PATH = 'http://localhost:3000/api/tournaments';

const buildQueryPath = (path: string, query: QueryTournamentDto) => {
  if (Object.keys(query).length > 0) {
    return Object.entries(query).reduce((acc, [key, value], idx) => {
      return idx === 0 ? `${acc}?${key}=${value}` : `${acc}&${key}=${value}`;
    }, `${path}`);
  }

  return path;
};

export const fetchUpcomingTournaments = async (query: QueryTournamentDto) => {
  const { data } = await axios.get<PageResponse<TournamentDto>>(
    buildQueryPath(`${API_PATH}/upcoming`, query),
  );

  return data;
};

export const fetchOrganizedTournaments = async (query: QueryTournamentDto) => {
  const { data } = await axios.get<PageResponse<TournamentDto>>(
    buildQueryPath(`${API_PATH}/organized`, query),
  );

  return data;
};

export const fetchRegisteredInTournaments = async (
  query: QueryTournamentDto,
) => {
  const { data } = await axios.get<PageResponse<TournamentDto>>(
    buildQueryPath(`${API_PATH}/registered`, query),
  );

  return data;
};

export const fetchTournamentById = async (id: string) => {
  const { data } = await axios.get<TournamentDto>(`${API_PATH}/${id}`);

  return data;
};
