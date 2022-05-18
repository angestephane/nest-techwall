import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Res,
  Req,
  Body,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  todo: Array<Todo>;

  constructor(private readonly todoService: TodoService) {
    this.todo = [];
  }

  @Get()
  getAllTodos(@Body() data: Todo, @Res() response: Response) {
    const todo = this.todoService.getAllTodos();
    response.status(200).send({ status: 'OK', data: todo });
  }

  @Get('/:id')
  getTodo(@Param() params, @Res() res: Response) {
    try {
      const data = this.todoService.getTodo(params.id);
      res.status(200).send({ status: 'OK', data: data });
    } catch (e) {
      throw {
        status: e?.status || 500,
        message: e.message || e,
      };
    }
  }

  @Post()
  addTodo(@Body() myData: Todo, @Res() res: Response) {
    try {
      this.todoService.addTodo(myData);
      res.status(201).send({ status: 'Objet crée avec succès', data: myData });
    } catch (e) {
      res.status(e?.status || 500).send({
        status: 'FAILED',
        data: {
          error: e.message || e,
        },
      });
    }
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

function params() {
  throw new Error('Function not implemented.');
}
