import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async countByEmail(email: string) {
    return this.userRepository.countBy({ email });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'passwordHash',
        'isActive',
        'createdAt',
      ],
    });
  }

  async getById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(partialUser: Partial<UserEntity>) {
    return this.userRepository.save(partialUser);
  }

  async update(id: number, changes: Partial<UserEntity>) {
    await this.userRepository.update(id, changes);
  }

  async findByTokenAndNotActivated(token: string) {
    return this.userRepository.findOneByOrFail({
      activationToken: token,
      isActive: false,
    });
  }

  async activate(user: UserEntity) {
    return this.userRepository.save({ ...user, isActive: true });
  }

  async findByPasswordResetToken(token: string) {
    return await this.userRepository.findOneBy({ passwordResetToken: token });
  }
}
