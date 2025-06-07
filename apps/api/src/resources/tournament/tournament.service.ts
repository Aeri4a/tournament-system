import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTournamentDto,
  QueryTournamentDto,
  RegisterForTournamentDto,
  TournamentDiscipline,
  UpdateTournamentDto,
  UserBasicDto,
} from 'common';
import { TournamentRegistration } from 'src/entity/tournament-registration.entity';
import { Tournament } from 'src/entity/tournament.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Brackets, FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    @InjectRepository(TournamentRegistration)
    private registrationRepository: Repository<TournamentRegistration>,
  ) {}

  async findUpcoming(queryDto: QueryTournamentDto, user: UserEntity | null) {
    const { page = 1, limit = 10, search } = queryDto;
    const pageNumber = +page;
    const limitNumber = +limit;
    const skip = (pageNumber - 1) * limitNumber;

    const qb = this.tournamentRepository.createQueryBuilder('tournament');
    qb.leftJoinAndSelect('tournament.organizer', 'organizer');

    qb.where('tournament.startTime > :now', { now: new Date() });

    if (user) {
      qb.andWhere('tournament.organizerId != :userId', { userId: user.id });

      qb.andWhere(
        'tournament.id NOT IN (SELECT "tournamentId" FROM tournament_registrations WHERE "userId" = :userId)',
        { userId: user.id },
      );
    }

    if (search) {
      qb.andWhere(
        new Brackets((subQuery) => {
          subQuery
            .where('tournament.name ILIKE :search', { search: `%${search}%` })
            .orWhere('tournament.locationAddress ILIKE :search', {
              search: `%${search}%`,
            });
        }),
      );
    }

    qb.orderBy('tournament.startTime', 'ASC').skip(skip).take(limitNumber);

    const [data, total] = await qb.getManyAndCount();

    const tournaments = data.map((tour) => ({
      ...tour,
      organizer: this.mapToBasicUserDto(tour.organizer),
    }));

    return { data: tournaments, total, page: pageNumber, limit: limitNumber };
  }

  async findOrganizedByUser(queryDto: QueryTournamentDto, userId: number) {
    const { page = 1, limit = 10, search } = queryDto;
    const pageNumber = +page;
    const limitNumber = +limit;
    const skip = (pageNumber - 1) * limitNumber;

    const where: FindManyOptions<Tournament>['where'] = {
      organizerId: userId,
    };

    if (search) {
      where.name = Like(`%${search}%`);
    }

    const [data, total] = await this.tournamentRepository.findAndCount({
      where,
      relations: ['organizer'],
      skip: skip,
      take: limitNumber,
      // order: { createdAt: 'DESC' },
    });

    const tournaments = data.map((tour) => ({
      ...tour,
      organizer: this.mapToBasicUserDto(tour.organizer),
    }));

    return {
      data: tournaments,
      total,
      page: pageNumber,
      limit: limitNumber,
    };
  }

  async findRegistered(userId: number, queryDto: QueryTournamentDto) {
    const { page = 1, limit = 10 } = queryDto;
    const pageNumber = +page;
    const limitNumber = +limit;
    const skip = (pageNumber - 1) * limitNumber;

    const [data, total] = await this.registrationRepository.findAndCount({
      where: { userId },
      relations: ['tournament', 'tournament.organizer'],
      // order: { 'ASC' },
      take: limit,
      skip: skip,
    });

    const mappedTournaments = data.map((registration) => ({
      ...registration.tournament,
      organizer: this.mapToBasicUserDto(registration.tournament.organizer),
    }));

    return {
      data: mappedTournaments,
      total,
      page: pageNumber,
      limit: limitNumber,
    };
  }

  async findByIdWithMap(id: number) {
    const tournament = await this.findOneById(id);

    return {
      ...tournament,
      organizer: this.mapToBasicUserDto(tournament.organizer),
    };
  }

  async findOneById(id: number) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });

    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    return tournament;
  }

  async create(
    createTournamentDto: CreateTournamentDto,
    organizerId: number,
  ): Promise<Tournament> {
    const { startTime, registrationDeadline, ...restDto } = createTournamentDto;

    const parsedStartTime = new Date(startTime);
    const parsedRegistrationDeadline = new Date(registrationDeadline);

    if (parsedStartTime <= new Date()) {
      throw new BadRequestException(
        'Tournament start time must be in the future.',
      );
    }
    if (parsedRegistrationDeadline >= parsedStartTime) {
      throw new BadRequestException(
        'Registration deadline must be before the tournament start time.',
      );
    }
    if (parsedRegistrationDeadline <= new Date()) {
      throw new BadRequestException(
        'Registration deadline must be in the future.',
      );
    }

    const tournament = this.tournamentRepository.create({
      ...restDto,
      startTime: parsedStartTime,
      registrationDeadline: parsedRegistrationDeadline,
      organizerId,
      discipline:
        createTournamentDto.discipline || TournamentDiscipline.PING_PONG,
    });
    return this.tournamentRepository.save(tournament);
  }

  async update(
    id: number,
    updateTournamentDto: UpdateTournamentDto,
    userId: number,
  ) {
    const tournament = await this.findOneById(id);

    if (tournament.organizerId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to edit this tournament.',
      );
    }

    if (
      tournament.startTime <= new Date() &&
      (updateTournamentDto.startTime ||
        updateTournamentDto.registrationDeadline ||
        updateTournamentDto.maxParticipants)
    ) {
      throw new BadRequestException(
        'Cannot change start time, deadline, or max participants for a tournament that has started or is in the past.',
      );
    }
    if (
      updateTournamentDto.startTime &&
      new Date(updateTournamentDto.startTime) <= new Date()
    ) {
      throw new BadRequestException('New start time must be in the future.');
    }
    if (
      updateTournamentDto.registrationDeadline &&
      new Date(updateTournamentDto.registrationDeadline) <= new Date()
    ) {
      throw new BadRequestException(
        'New registration deadline must be in the future.',
      );
    }
    if (
      updateTournamentDto.startTime &&
      updateTournamentDto.registrationDeadline &&
      new Date(updateTournamentDto.registrationDeadline) >=
        new Date(updateTournamentDto.startTime)
    ) {
      throw new BadRequestException(
        'New registration deadline must be before the new tournament start time.',
      );
    }

    const updatedTournamentData = { ...updateTournamentDto };
    if (updatedTournamentData.startTime)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updatedTournamentData.startTime = new Date(
        updatedTournamentData.startTime,
      ) as any;
    if (updatedTournamentData.registrationDeadline)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updatedTournamentData.registrationDeadline = new Date(
        updatedTournamentData.registrationDeadline,
      ) as any;

    await this.tournamentRepository.update(id, updatedTournamentData);
    const updatedTournament = await this.findOneById(id);
    return {
      ...updatedTournament,
      organizer: this.mapToBasicUserDto(updatedTournament.organizer),
    };
  }

  async registerForTournament(
    tournamentId: number,
    userId: number,
    registrationDto: RegisterForTournamentDto,
  ) {
    await this.registrationRepository.manager.transaction(
      async (entityManager) => {
        const tournamentRepo = entityManager.getRepository(Tournament);
        const registRepo = entityManager.getRepository(TournamentRegistration);

        const targetTournament = await tournamentRepo.findOneOrFail({
          where: {
            id: tournamentId,
          },
          relations: ['registrations'],
        });

        if (targetTournament.organizerId === userId) {
          throw new BadRequestException(
            'Cannot register in tournament you organised.',
          );
        }

        if (!targetTournament.isRegistrationOpen) {
          throw new BadRequestException(
            'Registration is closed for this tournament (deadline passed or full).',
          );
        }

        if (
          targetTournament.registrations.some((reg) => reg.userId === userId)
        ) {
          throw new ConflictException(
            'You are already registered for this tournament.',
          );
        }

        if (
          targetTournament.registrations.length >=
          targetTournament.maxParticipants
        ) {
          throw new BadRequestException(
            'Max participants reached for this tournaments.',
          );
        }

        const registration = registRepo.create({
          ...registrationDto,
          tournamentId,
          userId,
        });

        await registRepo.save(registration);
      },
    );
  }

  async cancelRegistration(id: number, userId: number) {
    const tournament = await this.tournamentRepository
      .findOneOrFail({
        where: { id },
        relations: ['registrations'],
      })
      .catch(() => {
        throw new BadRequestException('Cannot find tournament');
      });

    const targetRegistration = tournament.registrations.find(
      (registr) => registr.userId === userId,
    );

    if (!targetRegistration) {
      throw new BadRequestException(
        'Cannot cancel registration without registering',
      );
    }

    await this.registrationRepository.remove(targetRegistration);
  }

  async remove(id: number, userId: number): Promise<void> {
    const tournament = await this.findOneById(id);
    if (tournament.organizerId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this tournament.',
      );
    }
    if (tournament.registrations.length > 0) {
      throw new BadRequestException(
        'Cannot delete a tournament with registered participants.',
      );
    }
    if (tournament.startTime <= new Date()) {
      throw new BadRequestException(
        'Cannot delete a tournament that has already started or is in the past.',
      );
    }

    await this.tournamentRepository.delete(id);
  }

  private mapToBasicUserDto(user: UserEntity): UserBasicDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
