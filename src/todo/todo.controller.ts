import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';

import { FilterDatas } from './dto/get-query-todo.dto';
import { GetRequestDurationInterceptor } from './interceptors/get-request-duration.interceptor';

import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@UseInterceptors(GetRequestDurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // Obtenir la liste des todoListe
  @Get()
  async getAllTodos(@Query() query: FilterDatas): Promise<Array<Todo>> {
    return await this.todoService.getAllTodos(query);
  }

  // Retourne le nombre de tâche terminées
  @Get('stats')
  async countTask(@Query() status: FilterDatas) {
    return await this.todoService.countTask(status);
  }
  // Ajouter un nouveau todoListe
  @Post()
  async addTodo(@Body() data: AddTodoDto): Promise<Todo> {
    return await this.todoService.addTodo(data);
  }

  // Mise à jour d'une todoListe
  @Patch(':id')
  async updateTodo(
    @Param('id') todoId: string,
    @Body() data: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.updateTodo(todoId, data);
  }

  //obtenir une données via son id
  @Get(':id')
  async getOneTodo(@Param('id') todoId: string): Promise<Todo> {
    return await this.todoService.getOneTodo(todoId);
  }

  // Supprimer un todoListe
  @Delete(':id')
  async deleteTodo(@Param('id') todoId: string): Promise<Todo> {
    return await this.todoService.deleteTodo(todoId);
  }

  //Archiver une tâche
  @Delete('/archiver/:id')
  async archiverTodo(@Param('id') todoId: string) {
    return await this.todoService.archiverTodo(todoId);
  }

  //Desarchiver une tâche
  @Get('/archive/:id')
  async desarchiverTodo(@Param('id') todoId: string) {
    return await this.todoService.desarchiverTodo(todoId);
  }
}
