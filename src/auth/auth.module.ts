import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { TodoService } from '../todo/todo.service';
import { Todo } from '../todo/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  providers: [AuthService, TodoService],
  controllers: [AuthController],
})
export class AuthModule {}
