import { TournamentDiscipline } from './tournamentDiscipline.enum';

export interface QueryTournamentDto {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateTournamentDto {
  name: string;
  discipline?: TournamentDiscipline;
  startTime: string;
  registrationDeadline: string;
  locationAddress: string;
  maxParticipants: number;
  sponsorLogoUrls?: string[];
}

export interface UpdateTournamentDto {
  name?: string;
  startTime?: string;
  registrationDeadline?: string;
  locationAddress?: string;
  maxParticipants?: number;
  sponsorLogoUrls?: string[];
}

export interface RegisterForTournamentDto {
  licenseNumber: string;
  currentRanking: number;
}
