import { Injectable } from '@nestjs/common';
import { UserService } from 'src/resources/users/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private HASH_ROUNDS: number = 12; // should be env...

  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }
}
