import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from '../../entity/tournament.entity';
import { TournamentRegistration } from '../../entity/tournament-registration.entity';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, TournamentRegistration])],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
