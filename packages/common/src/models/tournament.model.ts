import { TournamentDiscipline } from './tournamentDiscipline.enum';
import { User, UserBasicDto } from './user.model';

export interface Tournament {
  id: number;
  name: string;
  discipline: TournamentDiscipline;
  startTime: Date;
  registrationDeadline: Date;
  locationAddress: string;
  maxParticipants: number;
  sponsorLogos: string[];
  organizerId: string;
  organizer: User;
  createdAt: Date;
  updatedAt: Date;
}

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

export type TournamentDto = Omit<
  Tournament,
  'organizer' | 'registrationDeadline' | 'startTime' | 'createdAt' | 'updatedAt'
> & {
  registrationDeadline: string;
  startTime: string;
  organizer: UserBasicDto;
  participants: UserBasicDto[];
  updatedAt: string;
  createdAt: string;
};

export type PageResponse<T> = {
  data: T[];
  limit: number;
  page: number;
  total: number;
};
