import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './local.guard';
import { RegisterUserDto } from 'common';
import { LoggedInGuard } from './loggen-in.guard';
import { AuthRequest } from 'src/types/AuthRequest';
import { SessionData } from 'express-session';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  login(@Req() req: AuthRequest) {
    return req.user;
  }

  @Post('/logout')
  logout(
    @Req() req: Request & { session: SessionData & { destroy: () => void } },
  ) {
    req.session.destroy();
  }

  @Post('/register')
  async register(@Body() dto: RegisterUserDto) {
    await this.authservice.registerUser(dto);
  }

  @Get('/confirmation')
  async activateAccount(@Query('token') token: string) {
    await this.authservice.activateUser(token);
    // TODO: redirect or sth
  }

  @Get()
  @UseGuards(LoggedInGuard)
  getUserInfo() {
    return '';
  }
}
