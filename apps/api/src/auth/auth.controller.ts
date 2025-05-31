import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './local.guard';
import {
  ConfirmUserDto,
  RegisterUserDto,
  RequestPasswordDto,
  ResetPasswordDto,
} from 'common';
import { LoggedInGuard } from './loggen-in.guard';
import { AuthRequest } from 'src/types/AuthRequest';
import { SessionData } from 'express-session';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(LoggedInGuard)
  getSessionState(@Req() req: AuthRequest) {
    return req.user;
  }

  @Post('/logout')
  @UseGuards(LoggedInGuard)
  @HttpCode(HttpStatus.OK)
  logout(
    @Req() req: Request & { session: SessionData & { destroy: () => void } },
  ) {
    req.session.destroy();
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  login(@Req() req: AuthRequest) {
    return req.user;
  }

  @Post('/register')
  async register(@Body() dto: RegisterUserDto) {
    await this.authService.registerUser(dto);
  }

  @Post('/confirmation')
  async activateAccount(@Body() dto: ConfirmUserDto) {
    await this.authService.activateUser(dto);
  }

  @Post('/request-password-reset')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(@Body() dto: RequestPasswordDto) {
    await this.authService.requestPasswordReset(dto.email);
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
  }
}
