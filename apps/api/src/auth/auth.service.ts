import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/resources/users/user.service';

import { RegisterUserDto } from 'common';

import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

import { UserEntity } from 'src/entity/user.entity';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class AuthService {
  private HASH_ROUNDS: number = 12; // should be env...

  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (
      user &&
      user.isActive &&
      (await bcrypt.compare(password, user.passwordHash))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  async registerUser(dto: RegisterUserDto) {
    if ((await this.userService.countByEmail(dto.email)) > 0) {
      throw new BadRequestException('Email already used');
    }

    const activationToken = uuid();
    const activationExpires = dayjs().add(2, 'day').tz().toDate();
    const passwordHash = await bcrypt.hash(dto.password, this.HASH_ROUNDS);

    const newUser: Partial<UserEntity> = {
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      activationExpires,
      activationToken,
      isActive: false,
    };

    await this.userService.create(newUser).catch((err) => {
      console.log(err);
      throw new BadRequestException('Cannot create user');
    });

    // send mail
  }
}
