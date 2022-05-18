import { Controller, Get, Post, Patch, Delete, Res, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(@Res() res: Response) {
    const data = this.todoService.getAllTodos();
    res.status(200).send({ status: 'OK', data: data });
  }

  @Get(':id')
  getTodo(@Req() req: Request, @Res() res: Response) {
    const data = this.todoService.getTodo(req.params.id);
    res.status(200).send({ status: 'OK', data: data });
  }

  @Post()
  addTodo(@Res() res: Response) {
    const data = this.todoService.addTodo();
    res.status(200).send({ status: 'OK', data: data });
  }

  @Patch(':id')
  updateTodo(@Req() req: Request, @Res() res: Response) {
    const data = this.todoService.updateTodo(req.params.id);
    res.status(200).send({ status: 'OK', data: data });
  }

  @Delete(':id')
  deleteTodo(@Req() req: Request, @Res() res: Response) {
    const data = this.todoService.deleteTodo(req.params.id);
    res.status(200).send({ status: 'OK', data: data });
  }
}
