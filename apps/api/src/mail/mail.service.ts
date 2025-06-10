import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'common';
import {
  CONFIRMATION_SUBJECT,
  generateConfLinkHTML,
  generateResetPasswordLinkHTML,
  RESET_PASSWORD_SUBJECT,
} from 'src/utils/confirmationMail.utils';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendRegisterConfirmationLink(email: User['email'], activationToken: string) {
    // TODO: env to create link
    const link = `http://localhost:5173/activate?token=${activationToken}`;

    return this.mailerService.sendMail({
      to: email,
      subject: CONFIRMATION_SUBJECT,
      html: generateConfLinkHTML(link),
    });
  }

  sendPasswordResetLink(email: User['email'], token: string) {
    // TODO: env to create link
    const link = `http://localhost:5173/reset-password?token=${token}`;

    return this.mailerService.sendMail({
      to: email,
      subject: RESET_PASSWORD_SUBJECT,
      html: generateResetPasswordLinkHTML(link),
    });
  }
}
