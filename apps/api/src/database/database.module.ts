import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerConfigService } from 'src/config/server-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ServerConfigService],
      useFactory: (configService: ServerConfigService) => ({
        type: 'postgres',
        host: configService.databaseConfig.host,
        port: configService.databaseConfig.port,
        username: configService.databaseConfig.username,
        password: configService.databaseConfig.password,
        database: configService.databaseConfig.database,
        migrationsRun: configService.databaseConfig.migrationsRun,
        migrationsTableName: configService.databaseConfig.migrationsTableName,
        migrations: configService.databaseConfig.migrations,
        entities: configService.databaseConfig.entities,
        synchronize: configService.databaseConfig.synchronize,
      }),
    }),
    // Entities
  ],
})
export class DatabaseModule {}
