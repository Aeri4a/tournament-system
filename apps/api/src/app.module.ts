import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TournamentModule } from './resources/tournament/tournament.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, TournamentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
