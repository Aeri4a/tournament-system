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

  async getByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async getById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
