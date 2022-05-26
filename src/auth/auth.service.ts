import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SubscribeDto } from './dto/subscribe.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async addUser(userData: SubscribeDto) {
    const user = this.userRepository.create({
      ...userData,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
      type UserValue = Pick<User, 'username' | 'email'>;
      const userToReturn: UserValue = {
        username: user.username,
        email: user.email,
      };
      return userToReturn;
    } catch (e) {
      throw new ConflictException({
        code: HttpStatus.CONFLICT,
        message: `Le username et l'email doivent être unique #${e}`,
      });
    }
  }
}
