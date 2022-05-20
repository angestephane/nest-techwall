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
import { SyntaxErrorSearchDataException } from './errors/error-handler';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller('todo')
export class TodoController {
  todo: Array<Todo>;

  constructor(private todoService: TodoService) {
    this.todo = [];
  }

  @Get()
  getAllTodos(@Body() data: Todo, @Res() response: Response) {
    const todo = this.todoService.getAllTodos();
    response.status(200).send({ status: 'OK', data: todo });
  }

  @Get(':id')
  getTodo(@Param('id') params, @Res() res: Response) {
    try {
      const data = this.todoService.getTodo(params);
      res.status(200).send({ status: 'OK', data: data });
    } catch (e) {
      throw new SyntaxErrorSearchDataException();
    }
  }

  @Post()
  addTodo(@Body() myData: AddTodoDto, @Res() res: Response) {
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
  updateTodo(
    @Param('id') todoId: string,
    @Body() body: UpdateTodoDto,
    @Res() res: Response,
  ) {
    if (!todoId) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error: 'Spécifier une référence',
        },
      });
    }

    try {
      const dataToUpdate = this.todoService.updateTodo(todoId, body);
      res.status(200).send({ status: 'OK', data: dataToUpdate });
    } catch (e) {
      res
        .status(e?.status || 500)
        .send({ status: 'FAILED', data: { error: e?.message || e } });
    }
  }

  @Delete(':id')
  deleteTodo(@Req() req: Request, @Res() res: Response) {
    try {
      const data = this.todoService.deleteTodo(req.params.id);
      res.status(200).send({ status: 'OK', data: data });
    } catch (e) {
      throw new SyntaxErrorSearchDataException();
    }
  }
}
