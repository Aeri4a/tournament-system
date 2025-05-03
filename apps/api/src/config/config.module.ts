import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ServerConfigService } from './server-config.service';

@Global()
@Module({
  imports: [NestConfigModule.forRoot({ envFilePath: '.env' })],
  providers: [ServerConfigService],
  exports: [ServerConfigService],
})
export class ConfigModule {}
