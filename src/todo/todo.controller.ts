import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';

import { Todo } from './entities/todo.entity';

import { FilterDatas } from './dto/get-query-todo.dto';
import { GetRequestDurationInterceptor } from './interceptors/get-request-duration.interceptor';

import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/awt-auth.guard';
import { Request } from 'express';
import { User } from '../auth/decorators/user.decorator';

@UseInterceptors(GetRequestDurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // Obtenir la liste des todoListe
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTodos(
    @Query() query: FilterDatas,
    @User() user,
  ): Promise<Array<Todo>> {
    return await this.todoService.getAllTodos(query, user);
  }

  // Retourne le nombre de tâche terminées
  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async countTask(@Query() status: FilterDatas, @User() user) {
    return await this.todoService.countTask(status, user);
  }

  // Ajouter un nouveau todoListe
  @UseGuards(JwtAuthGuard)
  @Post()
  async addTodo(
    @Body() data: AddTodoDto,
    @Req() request: Request,
  ): Promise<Todo> {
    const user = request.user;
    return await this.todoService.addTodo(data, user);
  }

  // Mise à jour d'une todoListe
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTodo(
    @Param('id') todoId: string,
    @Body() data: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.updateTodo(todoId, data);
  }

  //obtenir une données via son id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneTodo(@Param('id') todoId: string, @User() user): Promise<Todo> {
    return await this.todoService.getOneTodo(todoId, user);
  }

  // Supprimer un todoListe
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTodo(@Param('id') todoId: string): Promise<Todo> {
    return await this.todoService.deleteTodo(todoId);
  }

  //Archiver une tâche
  @UseGuards(JwtAuthGuard)
  @Delete('/archiver/:id')
  async archiverTodo(@Param('id') todoId: string) {
    return await this.todoService.archiverTodo(todoId);
  }

  //Desarchiver une tâche
  @UseGuards(JwtAuthGuard)
  @Get('/archive/:id')
  async desarchiverTodo(@Param('id') todoId: string) {
    return await this.todoService.desarchiverTodo(todoId);
  }
}
