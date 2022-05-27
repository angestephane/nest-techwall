import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PayloadInterface } from '../user/interface/payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: PayloadInterface) {
    //Récupérer le user
    const user = await this.userRepository.findOne({
      username: payload.username,
    });

    /***
     * verification si l'utilisateur existe.
     * On retourne ensuite les données qu'on souhaite dans la
     * requête
     */
    if (user) {
      const { password, salt, ...data } = user;
      return data;
    } else {
      throw new UnauthorizedException({
        code: HttpStatus.UNAUTHORIZED,
        message: 'vous êtes pas autorisé à acceder à la ressource !',
      });
    }
  }
}
