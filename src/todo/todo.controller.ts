import { Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(): string {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  getTodo(@Param() params): string {
    return this.todoService.getTodo(params.id);
  }

  @Post()
  addTodo(): string{
    return this.todoService.addTodo();
  }

  @Patch(':id')
  updateTodo(@Param() params): string{
    return this.todoService.updateTodo(params.id);
  }

  @Delete(':id')
  deleteTodo(@Param() params): string{
    return this.todoService.deleteTodo(params.id);
  }
}
