import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SubscribeDto } from './dto/subscribe.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { TodoService } from '../todo/todo.service';
import { FilterDatas } from "../todo/dto/get-query-todo.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private todoService: TodoService,
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

  async login(userLogin: LoginDto) {
    // Todo: Récupération des données envoyées par le user
    const { username, password } = userLogin;

    // ?Vérification s'il existe un user avec ce username
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('username = :username', { username: username })
      .getOne();

    // ?Déclanche une erreur si le user n'existe pas
    if (!user)
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'les information saisis sont erronées',
      });

    // Todo: si le user existe
    // Todo: hashage du password
    const hashPassword = await bcrypt.hash(password, user.salt);

    // ?Vérification du mot de passe
    if (hashPassword === user.password) {
      return 'connexion reussi';
    } else {
      throw new BadRequestException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Vérifier le mot de passe ou le username',
      });
    }
  }
}
