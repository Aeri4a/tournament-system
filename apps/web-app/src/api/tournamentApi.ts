import axios from '@/config/axiosConfig';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  CreateTournamentDto,
  PageResponse,
  QueryTournamentDto,
  TournamentDto,
  UpdateTournamentDto,
} from 'common';

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

export const createTournament = async (tournament: CreateTournamentDto) => {
  const { data } = await axios.post<TournamentDto>(`${API_PATH}`, tournament);
  return data;
};

export const useCreateTourMutation = (): UseMutationResult<
  TournamentDto,
  AxiosError<{ message?: string }>,
  CreateTournamentDto
> => {
  return useMutation<
    TournamentDto,
    AxiosError<{ message?: string }>,
    CreateTournamentDto
  >({
    mutationFn: createTournament,
  });
};

export const updateTournament = async (tournament: UpdateTournamentDto) => {
  const { data } = await axios.patch<TournamentDto>(
    `${API_PATH}/${tournament.id}`,
    tournament,
  );
  return data;
};

export const useUpdateTourMutation = (): UseMutationResult<
  TournamentDto,
  AxiosError<{ message?: string }>,
  UpdateTournamentDto
> => {
  return useMutation<
    TournamentDto,
    AxiosError<{ message?: string }>,
    UpdateTournamentDto
  >({
    mutationFn: updateTournament,
  });
};
