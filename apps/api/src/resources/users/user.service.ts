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
    return this.userRepository.findOneBy({ email });
  }

  async getById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(partialUser: Partial<UserEntity>) {
    return this.userRepository.save(partialUser);
  }
}
