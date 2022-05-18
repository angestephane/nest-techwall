import { Controller, Get, Post, Patch, Delete, Res, Req, Body } from "@nestjs/common";
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
  addTodo(@Body() myData, @Res() res: Response) {

    if (!myData.name) {
      res.status(400).send({
        status: 'Echèc',
        data: {
          error: "Echèc d'ajout. Données manquantes",
        },
      });
    }
    this.todoService.addTodo(myData);
    res.status(201).send({ status: 'Objet crée avec succès', data: myData });
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
