import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface DBConfig {
  type: string;
  host: string | undefined;
  port: number | undefined;
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  migrationsRun: boolean;
  migrationsTableName: string;
  migrations: string[];
  entities: string[];
  synchronize: boolean;
}

@Injectable()
export class ServerConfigService {
  constructor(private readonly configService: ConfigService) {}

  get databaseConfig(): DBConfig {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT')
        ? parseInt(this.configService.get('DB_PORT')!)
        : undefined,
      database: this.configService.get('DB_NAME'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASS'),
      entities: ['src/*.entity.ts'],
      migrations: ['dist/migrations/*.js'], // for some reason ts in src doesn't work for now
      migrationsRun: true,
      migrationsTableName: 'migrations',
      synchronize: false,
    };
  }
}
