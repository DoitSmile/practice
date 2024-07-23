import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Repository } from 'typeorm';
import {
  ICreateUser,
  IUserServicefindOneByEmail,
} from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneEmail({ email }: IUserServicefindOneByEmail) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser({ name, password, age, email }: ICreateUser): Promise<User> {
    const user = await this.findOneEmail({ email });
    if (user) throw new ConflictException('이미존재하는이메일입니다.');
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.save({
      name,
      age,
      password: hashedPassword,
      email,
    });
  }
}
