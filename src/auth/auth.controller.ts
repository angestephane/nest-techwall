import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async addUser(@Body() data: SubscribeDto, @Res() response: Response) {
    const userData = await this.authService.addUser(data);
    response.status(HttpStatus.OK).json(userData);
  }

  @Post('login')
  async login(@Body() data: LoginDto, @Res() response: Response) {
    const userData = await this.authService.login(data);
    response.status(HttpStatus.OK).send({
      status: 'OK',
      accessToken: userData,
    });
  }
}
