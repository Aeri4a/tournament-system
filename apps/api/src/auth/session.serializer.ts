import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/entity/user.entity';
import { UserService } from 'src/resources/users/user.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject()
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: UserEntity, done: (err, user: UserEntity['id']) => void) {
    done(null, user.id);
  }

  async deserializeUser(
    userId: number,
    done: (err, user: Omit<UserEntity, 'passwordHash'> | null) => void,
  ) {
    const userDB = await this.userService.getById(userId);
    if (!userDB) {
      done(null, null);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...rest } = userDB;

    done(null, rest);
  }
}
