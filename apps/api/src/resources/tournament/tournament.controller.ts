import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import {
  CreateTournamentDto,
  QueryTournamentDto,
  RegisterForTournamentDto,
  UpdateTournamentDto,
} from 'common';
import { UserDecorator } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entity/user.entity';
import { LoggedInGuard } from 'src/auth/loggen-in.guard';

@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get('/upcoming') // Public
  async findUpcoming(
    @Query() queryDto: QueryTournamentDto,
    @UserDecorator() user: UserEntity | null,
  ) {
    return this.tournamentService.findUpcoming(queryDto, user);
  }

  @Get('/organized')
  @UseGuards(LoggedInGuard)
  async findOrganized(
    @Query() queryDto: QueryTournamentDto,
    @UserDecorator() user: UserEntity,
  ) {
    return this.tournamentService.findOrganizedByUser(queryDto, user.id);
  }

  @Get('/registered')
  @UseGuards(LoggedInGuard)
  async getMyRegisteredTournaments(
    @Query() queryDto: QueryTournamentDto,
    @UserDecorator() user: UserEntity,
  ) {
    return this.tournamentService.findRegistered(user.id, queryDto);
  }

  @Post()
  @UseGuards(LoggedInGuard)
  async create(
    @Body() createTournamentDto: CreateTournamentDto,
    @UserDecorator() user: UserEntity,
  ) {
    const organizerId = user.id;
    return this.tournamentService.create(createTournamentDto, organizerId);
  }

  @Get(':id') // Public
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tournamentService.findByIdWithMap(id);
  }

  @Patch(':id')
  @UseGuards(LoggedInGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTournamentDto: UpdateTournamentDto,
    @UserDecorator() user: UserEntity,
  ) {
    return this.tournamentService.update(id, updateTournamentDto, user.id);
  }

  @Post(':id/register')
  @UseGuards(LoggedInGuard)
  async register(
    @Param('id', ParseIntPipe) tournamentId: number,
    @Body() registrationDto: RegisterForTournamentDto,
    @UserDecorator() user: UserEntity,
  ) {
    return this.tournamentService.registerForTournament(
      tournamentId,
      user.id,
      registrationDto,
    );
  }

  @Post(':id/register-cancel')
  @UseGuards(LoggedInGuard)
  async cancelRegister(
    @Param('id', ParseIntPipe) tournamentId: number,
    @UserDecorator() user: UserEntity,
  ) {
    return this.tournamentService.cancelRegistration(tournamentId, user.id);
  }

  // TODO: future
  // @Delete(':id')
  // @UseGuards(LoggedInGuard)
  // async remove(
  //   @Param('id', ParseIntPipe) id: number,
  //   // @Req() req: Request,
  // ) {
  //   const userId = 1; // Placeholder
  //   if (!userId) throw new ForbiddenException('User not authenticated.');
  //   return this.tournamentService.remove(id, userId);
  // }
}
