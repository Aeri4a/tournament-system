import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ServerConfigService } from 'src/config/server-config.service';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ServerConfigService],
      useFactory: (configService: ServerConfigService) => ({
        transport: {
          host: configService.emailConfig.host,
          port: configService.emailConfig.port,
          auth: {
            user: configService.emailConfig.user,
            pass: configService.emailConfig.password,
          },
          secure: false,
        },
        dfaults: {
          from: `pingpong-challenge <${configService.emailConfig.user ?? ''}>`,
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
