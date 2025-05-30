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

interface MailBoxConfig {
  host?: string;
  user?: string;
  password?: string;
  port?: number;
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
      entities: ['dist/entity/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
      migrationsTableName: 'migrations',
      synchronize: false,
    };
  }

  get emailConfig(): MailBoxConfig {
    return {
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      password: this.configService.get('EMAIL_PASS'),
      user: this.configService.get('EMAIL_USER'),
    };
  }
}
